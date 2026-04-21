// Vercel serverless function — calcula la tarifa de Blue Express via WooCommerce Store API
// Usa Application Passwords de WordPress para saltear la validación de nonce.

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { items = [], address = {} } = req.body ?? {};

    const WC_URL = (process.env.VITE_WC_URL ?? '').replace(/\/$/, '');
    const WP_USER = process.env.WP_APP_USER ?? '';
    const WP_PASS = process.env.WP_APP_PASSWORD ?? '';
    const STORE = `${WC_URL}/wp-json/wc/store/v1`;

    if (!WP_USER || !WP_PASS) {
        console.error('[get-shipping] WP_APP_USER o WP_APP_PASSWORD no configurados');
        return res.status(500).json({ error: 'Credenciales de WordPress no configuradas' });
    }

    const AUTH = `Basic ${Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')}`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': AUTH,
    };

    try {
        // 1. Iniciar sesión — el carrito de WC es session-based incluso con App Passwords
        const initRes = await fetch(`${STORE}/cart`, { headers });
        const setCookie = initRes.headers.get('set-cookie') ?? '';
        // Extraer solo el par nombre=valor de la cookie (sin atributos como Path, SameSite, etc.)
        const sessionCookie = setCookie.split(',')
            .map(c => c.trim().split(';')[0])
            .join('; ');

        const sessionHeaders = {
            ...headers,
            ...(sessionCookie ? { Cookie: sessionCookie } : {}),
        };

        // 2. Limpiar carrito previo de esta sesión y agregar los productos actuales
        await fetch(`${STORE}/cart/items`, { method: 'DELETE', headers: sessionHeaders });

        for (const item of items) {
            if (!item.wcId) continue;
            const addRes = await fetch(`${STORE}/cart/add-item`, {
                method: 'POST',
                headers: sessionHeaders,
                body: JSON.stringify({ id: item.wcId, quantity: item.quantity ?? 1 }),
            });
            if (!addRes.ok) {
                console.error('[get-shipping] add-item error:', addRes.status, await addRes.text());
            }
        }

        // 3. Setear dirección de envío
        const updateRes = await fetch(`${STORE}/cart/update-customer`, {
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
        if (!updateRes.ok) {
            console.error('[get-shipping] update-customer error:', updateRes.status, await updateRes.text());
        }

        // 4. Obtener carrito con tarifas calculadas
        const cartRes = await fetch(`${STORE}/cart`, { headers: sessionHeaders });
        const cart = await cartRes.json();

        console.log('[get-shipping] shipping_rates:', JSON.stringify(cart.shipping_rates ?? []));

        const packages = cart.shipping_rates ?? [];
        const allRates = packages.flatMap(pkg => pkg.shipping_rates ?? []);

        const blueRate = allRates.find(r =>
            (r.name ?? '').toLowerCase().includes('blue') ||
            (r.rate_id ?? '').toLowerCase().includes('blue')
        );

        if (blueRate) {
            // Store API devuelve precios en centavos (×100), CLP no tiene decimales
            const cost = parseInt(blueRate.price ?? '0', 10) / 100;
            return res.status(200).json({
                cost,
                label: blueRate.name ?? 'Blue Express',
                rateId: blueRate.rate_id ?? '',
            });
        }

        console.warn('[get-shipping] Blue Express no encontrado. allRates:', JSON.stringify(allRates));
        return res.status(200).json({ cost: 0, label: 'Blue Express', rateId: null });

    } catch (err) {
        console.error('[get-shipping] excepción:', err?.message ?? err);
        return res.status(500).json({ error: 'No se pudo calcular el envío' });
    }
}
