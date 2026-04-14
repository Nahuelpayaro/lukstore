import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, XCircle, Clock } from 'lucide-react';
import { PageMeta } from '../hooks/usePageMeta';
import { trackPurchase } from '../utils/ecommerceTracker';
import { getOrderById } from '../lib/woocommerce';

const PAID_STATUSES = ['processing', 'completed'];
const FAILED_STATUSES = ['failed', 'cancelled', 'refunded'];
const MAX_ATTEMPTS = 6;
const POLL_INTERVAL = 2500;

const Success = () => {
    const [searchParams] = useSearchParams();
    const flowToken = searchParams.get('token');

    const [status, setStatus] = useState('loading'); // loading | paid | pending | failed
    const [orderDetails, setOrderDetails] = useState(null);
    const [wcOrder, setWcOrder] = useState(null);

    useEffect(() => {
        const savedOrder = (() => {
            try { return JSON.parse(sessionStorage.getItem('lastOrderGA4')); }
            catch { return null; }
        })();

        if (savedOrder) setOrderDetails(savedOrder);

        // Flujo Flow: hay token en la URL y tenemos el orderId guardado
        if (flowToken && savedOrder?.transactionId) {
            pollOrderStatus(savedOrder.transactionId, savedOrder, 0);
            return;
        }

        // Fallback: acceso directo sin token (demo o recarga)
        setStatus('pending');
    }, []);

    const pollOrderStatus = async (orderId, savedOrder, attempt) => {
        try {
            const order = await getOrderById(orderId);
            setWcOrder(order);

            if (PAID_STATUSES.includes(order.status)) {
                setStatus('paid');
                sessionStorage.removeItem('lastOrderGA4');
                if (savedOrder) {
                    trackPurchase(
                        savedOrder.cartItems,
                        savedOrder.cartTotal,
                        String(orderId),
                        0,
                        0,
                        savedOrder.customer
                    );
                }
                return;
            }

            if (FAILED_STATUSES.includes(order.status)) {
                setStatus('failed');
                sessionStorage.removeItem('lastOrderGA4');
                return;
            }

            // Sigue pendiente — reintentar si no agotamos los intentos
            if (attempt < MAX_ATTEMPTS - 1) {
                setTimeout(() => pollOrderStatus(orderId, savedOrder, attempt + 1), POLL_INTERVAL);
            } else {
                // Agotamos intentos — mostramos pendiente
                setStatus('pending');
            }
        } catch {
            if (attempt < MAX_ATTEMPTS - 1) {
                setTimeout(() => pollOrderStatus(orderId, savedOrder, attempt + 1), POLL_INTERVAL);
            } else {
                setStatus('pending');
            }
        }
    };

    if (status === 'loading') {
        return (
            <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <Loader2 size={48} style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ color: '#666', fontSize: '1rem' }}>Verificando tu pago...</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                <PageMeta title="Pago Fallido" description="Hubo un problema con tu pago." />
                <XCircle size={64} color="#dc3545" style={{ marginBottom: '1.5rem' }} />
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>El pago no fue procesado</h1>
                <p style={{ color: '#666', maxWidth: '480px', marginBottom: '2rem' }}>
                    Hubo un problema al procesar tu pago. No se realizó ningún cargo. Podés volver al carrito e intentarlo de nuevo.
                </p>
                <Link to="/cart" className="btn btn-primary" style={{ borderRadius: '30px', padding: '1rem 3rem' }}>Volver al carrito</Link>
            </div>
        );
    }

    if (status === 'pending') {
        return (
            <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                <PageMeta title="Pago Pendiente" description="Tu pago está siendo procesado." />
                <Clock size={64} color="#f0ad4e" style={{ marginBottom: '1.5rem' }} />
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Tu pago está siendo confirmado</h1>
                <p style={{ color: '#666', maxWidth: '480px', marginBottom: '2rem' }}>
                    Estamos esperando la confirmación de Flow. Esto puede tardar unos minutos. Vas a recibir un email cuando tu pedido sea confirmado.
                </p>
                {orderDetails?.transactionId && (
                    <p style={{ fontSize: '0.9rem', color: '#999' }}>N° de orden: {orderDetails.transactionId}</p>
                )}
                <Link to="/" className="btn btn-primary" style={{ borderRadius: '30px', padding: '1rem 3rem', marginTop: '1.5rem' }}>Volver a la tienda</Link>
            </div>
        );
    }

    // status === 'paid'
    return (
        <div className="container" style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <PageMeta title="Compra Exitosa" description="Gracias por tu compra." />
            <CheckCircle size={64} color="#28a745" style={{ marginBottom: '1.5rem' }} />
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¡Gracias por tu compra!</h1>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '500px', margin: '0 auto 2rem' }}>
                Tu pago fue aprobado y tu pedido ha sido confirmado.
                {orderDetails?.customer?.email && (
                    <span style={{ display: 'block', marginTop: '0.8rem', color: '#444' }}>
                        Hemos enviado un comprobante a <strong>{orderDetails.customer.email}</strong> con todos los detalles.
                    </span>
                )}
                {(wcOrder?.id || orderDetails?.transactionId) && (
                    <span style={{
                        display: 'block',
                        marginTop: '1.5rem',
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        fontWeight: '600'
                    }}>
                        N° de Orden: <br />
                        <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#555' }}>
                            {wcOrder?.id || orderDetails?.transactionId}
                        </span>
                    </span>
                )}
            </p>

            {orderDetails?.cartItems && (
                <div className="order-receipt-container" style={{ width: '100%', maxWidth: '600px', textAlign: 'left', marginBottom: '2rem' }}>
                    <div className="order-receipt" style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', paddingBottom: '1rem', borderBottom: '1px solid #eee', marginBottom: '1.5rem' }}>Productos adquiridos</h2>
                        {orderDetails.cartItems.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#111' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>Talla: {item.size} | Cant.: {item.quantity}</div>
                                    </div>
                                </div>
                                <div style={{ fontWeight: '700', color: '#111' }}>
                                    ${(parseInt(String(item.price).replace(/\./g, '')) * item.quantity).toLocaleString('es-CL')}
                                </div>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px dashed #eee', fontWeight: '800', fontSize: '1.2rem' }}>
                            <span>Total Pagado</span>
                            <span style={{ color: '#000' }}>${(orderDetails.cartTotal).toLocaleString('es-CL')}</span>
                        </div>
                    </div>

                    {orderDetails.customer && (
                        <div className="shipping-info" style={{ background: '#f8f9fa', padding: '1.5rem 2rem', border: '1px solid #eee', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#333' }}>Información de Envío</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', color: '#555' }}>
                                <div>
                                    <strong style={{ display: 'block', color: '#111', marginBottom: '0.2rem' }}>Cliente</strong>
                                    {orderDetails.customer.firstName} {orderDetails.customer.lastName}
                                </div>
                                <div>
                                    <strong style={{ display: 'block', color: '#111', marginBottom: '0.2rem' }}>Email</strong>
                                    {orderDetails.customer.email}
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <strong style={{ display: 'block', color: '#111', marginBottom: '0.2rem' }}>Dirección de Despacho</strong>
                                    {orderDetails.customer.address}, {orderDetails.customer.city}, Región {orderDetails.customer.region}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <Link to="/" className="btn btn-primary" style={{ borderRadius: '30px', padding: '1rem 3rem' }}>Volver a la Tienda</Link>
        </div>
    );
};

export default Success;
