// Vercel serverless function — calcula la tarifa de Blue Express via WooCommerce Store API
// Se llama server-side para evitar CORS y manejar la sesión del carrito correctamente.

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { items = [], address = {} } = req.body ?? {};

    const WC_URL = (process.env.VITE_WC_URL ?? '').replace(/\/$/, '');
    const STORE = `${WC_URL}/wp-json/wc/store/v1`;

    try {
        // 1. Iniciar sesión de carrito — WooCommerce devuelve una cookie de sesión
        const initRes = await fetch(`${STORE}/cart`, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Extraer cookie de sesión y nonce para requests posteriores
        const rawCookie = initRes.headers.get('set-cookie') ?? '';
        const sessionCookie = rawCookie.split(';')[0]; // solo el valor, sin atributos
        const nonce = initRes.headers.get('x-wc-store-api-nonce') ?? '';

        const sessionHeaders = {
            'Content-Type': 'application/json',
            ...(sessionCookie ? { Cookie: sessionCookie } : {}),
            ...(nonce ? { 'X-WC-Store-API-Nonce': nonce } : {}),
        };

        // 2. Agregar productos al carrito
        for (const item of items) {
            if (!item.wcId) continue;
            await fetch(`${STORE}/cart/add-item`, {
                method: 'POST',
                headers: sessionHeaders,
                body: JSON.stringify({ id: item.wcId, quantity: item.quantity ?? 1 }),
            });
        }

        // 3. Setear dirección de envío
        await fetch(`${STORE}/cart/update-customer`, {
            method: 'POST',
            headers: sessionHeaders,
            body: JSON.stringify({
                shipping_address: {
                    country: 'CL',
                    state: address.region ?? '',
                    city: address.city ?? '',
                    address_1: address.address ?? '',
                },
            }),
        });

        // 4. Obtener carrito con tarifas calculadas
        const cartRes = await fetch(`${STORE}/cart`, { headers: sessionHeaders });
        const cart = await cartRes.json();

        const packages = cart.shipping_rates ?? [];
        const allRates = packages.flatMap(pkg => pkg.shipping_rates ?? []);

        const blueRate = allRates.find(r =>
            (r.name ?? '').toLowerCase().includes('blue') ||
            (r.rate_id ?? '').toLowerCase().includes('blue')
        );

        if (blueRate) {
            // Store API devuelve precios como enteros en unidades menores × 100
            // CLP no tiene decimales, pero WC igual multiplica × 100 internamente
            const rawPrice = parseInt(blueRate.price ?? '0', 10);
            const cost = rawPrice / 100;
            return res.status(200).json({
                cost,
                label: blueRate.name ?? 'Blue Express',
                rateId: blueRate.rate_id ?? '',
            });
        }

        // No se encontró Blue Express — devolver 0 como fallback
        return res.status(200).json({ cost: 0, label: 'Blue Express', rateId: null });

    } catch (err) {
        console.error('[get-shipping]', err?.message ?? err);
        return res.status(500).json({ error: 'No se pudo calcular el envío' });
    }
}
