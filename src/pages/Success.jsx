import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { PageMeta } from '../hooks/usePageMeta';
import { supabase } from '../supabase';

const Success = () => {
    const [searchParams] = useSearchParams();
    const [orderId, setOrderId] = useState(searchParams.get('orderId') || searchParams.get('external_reference'));
    const paymentStatus = searchParams.get('status');
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        const verifyPayment = async () => {
             if(orderId && paymentStatus === 'approved') {
                 // Update order status in Supabase to 'paid'
                 const { error } = await supabase
                    .from('orders')
                    .update({ status: 'paid' })
                    .eq('id', orderId);
                 
                 if(error) console.error("Error updating order status:", error);
             }
             setIsVerifying(false);
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
                Tu pago ha sido {paymentStatus === 'approved' ? 'aprobado' : 'procesado'} y tu pedido ha sido confirmado. Hemos enviado un correo con los detalles de tu compra.
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
            <Link to="/" className="btn btn-primary" style={{ borderRadius: '30px' }}>Volver al Inicio</Link>
        </div>
    );
};

export default Success;
