import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { PageMeta } from '../hooks/usePageMeta';
import { trackPurchase } from '../utils/ecommerceTracker';

const Success = () => {
    const [searchParams] = useSearchParams();
    const [orderId] = useState(searchParams.get('orderId') || searchParams.get('external_reference'));
    const paymentStatus = searchParams.get('status');
    const [isVerifying, setIsVerifying] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            if (orderId && paymentStatus === 'approved') {
                const lastOrderStr = sessionStorage.getItem('lastOrderGA4');
                if (lastOrderStr) {
                    try {
                        const orderData = JSON.parse(lastOrderStr);
                        setOrderDetails(orderData);
                        trackPurchase(orderData.cartItems, orderData.cartTotal, orderData.transactionId || orderId, 0, 0, orderData.customer);
                        sessionStorage.removeItem('lastOrderGA4');
                    } catch(e) {
                        console.error('Error procesando datos de orden:', e);
                    }
                }
            }
            setTimeout(() => setIsVerifying(false), 800);
        };

        verifyPayment();
    }, [orderId, paymentStatus]);

    if (isVerifying) {
        return (
             <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Loader2 className="spinner" size={48} style={{ animation: 'spin 1s linear infinite' }} />
             </div>
        );
    }

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
                Tu pago ha sido {paymentStatus === 'approved' ? 'aprobado' : 'procesado'} y tu pedido ha sido confirmado.
                {orderDetails?.customer?.email && (
                    <span style={{ display: 'block', marginTop: '0.8rem', color: '#444' }}>
                        Hemos enviado un comprobante a <strong>{orderDetails.customer.email}</strong> con todos los detalles de tu compra para tu seguridad.
                    </span>
                )}
                {orderId && (
                    <span style={{ 
                        display: 'block', 
                        marginTop: '1.5rem', 
                        padding: '1rem', 
                        background: '#f8f9fa', 
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        fontWeight: '600' 
                    }}>
                        ID de Orden: <br/><span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#555'}}>{orderId}</span>
                    </span>
                )}
            </p>

            {orderDetails && orderDetails.cartItems && (
                <div className="order-receipt-container" style={{ width: '100%', maxWidth: '600px', textAlign: 'left', marginBottom: '2rem' }}>
                    {/* Items Section */}
                    <div className="order-receipt" style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', paddingBottom: '1rem', borderBottom: '1px solid #eee', marginBottom: '1.5rem' }}>Productos adquiridos</h2>
                        {orderDetails.cartItems.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}/>
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

                    {/* Customer Info Section */}
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
