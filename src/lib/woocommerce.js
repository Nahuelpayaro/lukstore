const BASE_URL = `${(import.meta.env.VITE_WC_URL ?? '').replace(/\/$/, '')}/wp-json/wc/v3`;
const AUTH = `consumer_key=${import.meta.env.VITE_WC_KEY}&consumer_secret=${import.meta.env.VITE_WC_SECRET}`;
const AUTH_HEADER = 'Basic ' + btoa(`${import.meta.env.VITE_WC_KEY}:${import.meta.env.VITE_WC_SECRET}`);

// Helper: lee un atributo por nombre (case-insensitive)
const getAttr = (attributes = [], names) => {
    const attr = attributes.find(a => names.includes(a.name.toLowerCase()));
    return attr?.options?.[0] ?? '';
};

// Convierte un producto de WooCommerce al shape que usa la app
export const normalizeProduct = (p) => {
    const tags = p.tags ?? [];
    const categories = p.categories ?? [];
    const images = (p.images ?? []).map(img => img.src);

    // Ordenar categorías: padre primero (parent=0), hijo después
    const sortedCategories = [...categories].sort((a, b) => a.parent - b.parent);
    const hierarchy = sortedCategories.map(c => c.name);
    const category = sortedCategories[0]?.name ?? '';

    // Tallas desde atributo "Talle", "Talla" o "Size"
    const sizeAttr = (p.attributes ?? []).find(a =>
        ['talle', 'talla', 'size'].includes(a.name.toLowerCase())
    );
    const productStock = p.stock_quantity ?? (p.stock_status === 'instock' ? 1 : 0);
    const sizes = sizeAttr?.options?.map(s => ({ size: s, stock: productStock }))
        ?? [{ size: 'Única', stock: productStock }];

    // Condición desde atributo "Condición" o "Condition"
    const conditionRaw = getAttr(p.attributes ?? [], ['condición', 'condicion', 'condition']);
    const condition = ['used', 'usado', 'pre-loved'].includes(conditionRaw.toLowerCase())
        ? 'used'
        : 'new';

    // Precios
    const price = parseFloat(p.price) || parseFloat(p.regular_price) || 0;
    const regularPrice = parseFloat(p.regular_price) || 0;
    const salePrice = parseFloat(p.sale_price) || null;
    const originalPrice = salePrice ? regularPrice : null;
    const discount = salePrice && regularPrice > 0
        ? Math.round((1 - salePrice / regularPrice) * 100)
        : null;

    return {
        id: p.slug,
        wcId: p.id,
        title: p.name,
        slug: p.slug,
        price,
        originalPrice,
        discount,
        sku: p.sku || '',
        stock: p.stock_quantity ?? (p.stock_status === 'instock' ? 1 : 0),
        image: images[0] ?? '',
        images,
        condition,
        isDrop: tags.some(t => ['drop', 'drops'].includes(t.slug)),
        isFeatured: p.featured ?? false,
        cluster: p.slug,
        hierarchy,
        category,
        gender: getAttr(p.attributes ?? [], ['género', 'genero', 'gender']) || 'Unisex',
        tags: tags.map(t => t.slug),
        seo: {
            title: `${p.name} - Envíos a todo Chile`,
            description: (p.short_description || p.description || '')
                .replace(/<[^>]*>/g, '')
                .slice(0, 160),
        },
        shortDescription: (p.short_description || '').replace(/<[^>]*>/g, ''),
        longDescription: p.description || '',
        description: (p.description || '').replace(/<[^>]*>/g, ''),
        specs: {
            brand: getAttr(p.attributes ?? [], ['marca', 'brand']),
            model: getAttr(p.attributes ?? [], ['modelo', 'model']),
            colorway: getAttr(p.attributes ?? [], ['color', 'colorway']),
            releaseYear: getAttr(p.attributes ?? [], ['año', 'year', 'release year']),
        },
        faq: [],
        sizes,
    };
};

// Trae todos los productos publicados (máximo 100)
export const getProducts = async () => {
    try {
        const res = await fetch(`${BASE_URL}/products?per_page=100&status=publish&${AUTH}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data.map(normalizeProduct);
    } catch (err) {
        console.error('[WooCommerce] getProducts:', err);
        return [];
    }
};

// Trae un producto por su ID numérico de WooCommerce
export const getProductById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}?${AUTH}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return normalizeProduct(await res.json());
    } catch (err) {
        console.error(`[WooCommerce] getProductById(${id}):`, err);
        return null;
    }
};

// Trae productos filtrando por slug de categoría
export const getProductsByCategory = async (categorySlug) => {
    try {
        const catRes = await fetch(`${BASE_URL}/products/categories?slug=${categorySlug}&${AUTH}`);
        if (!catRes.ok) throw new Error(`HTTP ${catRes.status}`);
        const categories = await catRes.json();
        if (!categories.length) return [];

        const categoryId = categories[0].id;
        const res = await fetch(`${BASE_URL}/products?category=${categoryId}&per_page=100&status=publish&${AUTH}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data.map(normalizeProduct);
    } catch (err) {
        console.error(`[WooCommerce] getProductsByCategory(${categorySlug}):`, err);
        return [];
    }
};

// Crea una orden en WooCommerce y devuelve la orden con su URL de pago
export const createOrder = async ({ customer, items, shippingLine }) => {
    const body = {
        set_paid: false,
        billing: {
            first_name: customer.firstName,
            last_name: customer.lastName,
            email: customer.email,
            address_1: customer.address,
            city: customer.city,
            state: customer.region,
            country: 'CL',
        },
        shipping: {
            first_name: customer.firstName,
            last_name: customer.lastName,
            address_1: customer.address,
            city: customer.city,
            state: customer.region,
            country: 'CL',
        },
        line_items: items.map(item => ({
            product_id: item.wcId,
            quantity: item.quantity,
            ...(item.variationId ? { variation_id: item.variationId } : {}),
        })),
        ...(shippingLine ? {
            shipping_lines: [{
                method_id: shippingLine.methodId,
                method_title: shippingLine.methodTitle,
                total: String(shippingLine.cost),
            }]
        } : {}),
    };

    const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AUTH_HEADER,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
};

// Trae una orden por su ID numérico de WooCommerce
export const getOrderById = async (id) => {
    const res = await fetch(`${BASE_URL}/orders/${id}`, {
        headers: { 'Authorization': AUTH_HEADER },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
};

// Busca el método de envío Blue Express en las zonas de WooCommerce
// Devuelve { methodId, methodTitle, cost } o null si no encuentra tarifa fija
export const getBlueExpressRate = async () => {
    try {
        const zonesRes = await fetch(`${BASE_URL}/shipping/zones?${AUTH}`);
        if (!zonesRes.ok) throw new Error(`HTTP ${zonesRes.status}`);
        const zones = await zonesRes.json();

        for (const zone of zones) {
            const methodsRes = await fetch(`${BASE_URL}/shipping/zones/${zone.id}/methods?${AUTH}`);
            if (!methodsRes.ok) continue;
            const methods = await methodsRes.json();

            const blueExpressMethod = methods.find(m =>
                m.method_id?.toLowerCase().includes('blue') ||
                m.method_title?.toLowerCase().includes('blue')
            );

            if (blueExpressMethod) {
                const cost = parseFloat(
                    blueExpressMethod.settings?.cost?.value ?? 0
                );
                return {
                    methodId: blueExpressMethod.method_id,
                    methodTitle: blueExpressMethod.method_title || 'Blue Express',
                    cost,
                };
            }
        }
        return null;
    } catch (err) {
        console.error('[WooCommerce] getBlueExpressRate:', err);
        return null;
    }
};

// Trae todas las categorías disponibles
export const getCategories = async () => {
    try {
        const res = await fetch(`${BASE_URL}/products/categories?per_page=100&hide_empty=false&${AUTH}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error('[WooCommerce] getCategories:', err);
        return [];
    }
};
