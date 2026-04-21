// Vercel serverless function — calcula la tarifa de Blue Express
// usando el endpoint custom /wp-json/lukstore/v1/shipping-rate en WordPress.

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { items = [], address = {} } = req.body ?? {};

    const WC_URL = (process.env.VITE_WC_URL ?? '').replace(/\/$/, '');
    const ENDPOINT = `${WC_URL}/wp-json/lukstore/v1/shipping-rate`;

    try {
        const wpRes = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                state: address.region ?? '',
                city:  address.city  ?? '',
                items: items.map(i => ({ wcId: i.wcId, quantity: i.quantity ?? 1 })),
            }),
        });

        if (!wpRes.ok) {
            const txt = await wpRes.text();
            console.error('[get-shipping] WP endpoint error:', wpRes.status, txt);
            return res.status(200).json({ cost: 0, label: 'Blue Express', rateId: null });
        }

        const data = await wpRes.json();
        console.log('[get-shipping] WP response:', JSON.stringify(data));

        if (data.found && data.rate) {
            return res.status(200).json({
                cost:   data.rate.cost,
                label:  data.rate.label ?? 'Blue Express',
                rateId: data.rate.id ?? '',
            });
        }

        return res.status(200).json({ cost: 0, label: 'Blue Express', rateId: null });

    } catch (err) {
        console.error('[get-shipping] excepción:', err?.message ?? err);
        return res.status(500).json({ error: 'No se pudo calcular el envío' });
    }
}
