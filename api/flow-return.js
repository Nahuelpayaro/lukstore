// Vercel serverless function — Flow redirects the payer back here after the
// payment, sending the transaction token via POST form data. Static SPA pages
// cannot receive POST requests (Vercel responds 405), so this endpoint accepts
// the POST and forwards the customer to /success with the token as a query
// parameter, which the React page reads to poll the order status.
//
// The Flow plugin's "Return Url" in WordPress must point to this endpoint:
// https://www.lukstore.cl/api/flow-return

export default function handler(req, res) {
    let token = req.body?.token ?? req.query?.token ?? '';

    // Some setups deliver the form body as a raw string — parse it manually
    if (typeof req.body === 'string' && !token) {
        token = new URLSearchParams(req.body).get('token') ?? '';
    }

    if (Array.isArray(token)) token = token[0] ?? '';

    const target = token
        ? `/success?token=${encodeURIComponent(token)}`
        : '/success';

    res.writeHead(302, { Location: target });
    res.end();
}
