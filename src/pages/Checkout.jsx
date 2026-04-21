import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PageMeta } from '../hooks/usePageMeta';
import { createOrder, getBlueExpressRate } from '../lib/woocommerce';
import { trackAddShippingInfo, trackAddPaymentInfo } from '../utils/ecommerceTracker';
import './Cart.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        region: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [shippingRate, setShippingRate] = useState(null); // { methodId, methodTitle, cost }
    const [shippingLoading, setShippingLoading] = useState(false);

    React.useEffect(() => {
        setShippingLoading(true);
        getBlueExpressRate()
            .then(rate => setShippingRate(rate))
            .finally(() => setShippingLoading(false));
    }, []);

    const shippingCost = shippingRate?.cost ?? 0;
    const orderTotal = cartTotal + shippingCost;

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Tu carrito está vacío (Checkout)</h2>
                <Link to="/" className="btn btn-primary">Volver a la tienda</Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Verificar que todos los items tengan wcId (vienen de WooCommerce)
            const itemsSinWcId = cartItems.filter(item => !item.wcId);
            if (itemsSinWcId.length > 0) {
                // Fallback para productos del catálogo local (demo)
                const fakeOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
                trackAddShippingInfo(cartItems, cartTotal, 'Standard', formData);
                trackAddPaymentInfo(cartItems, cartTotal, 'Gateway', formData);
                sessionStorage.setItem('lastOrderGA4', JSON.stringify({
                    cartItems,
                    cartTotal,
                    transactionId: fakeOrderId,
                    customer: formData
                }));
                clearCart();
                navigate(`/success?status=approved&orderId=${fakeOrderId}`);
                return;
            }

            // Crear orden en WooCommerce
            const order = await createOrder({
                customer: formData,
                items: cartItems,
                shippingLine: shippingRate,
            });

            // Guardar datos para GA4 y recibo en /success
            trackAddShippingInfo(cartItems, cartTotal, 'Standard', formData);
            trackAddPaymentInfo(cartItems, cartTotal, 'Gateway', formData);
            sessionStorage.setItem('lastOrderGA4', JSON.stringify({
                cartItems,
                cartTotal,
                transactionId: order.id,
                customer: formData
            }));

            clearCart();

            // Redirigir a la URL de pago del gateway configurado en WooCommerce
            window.location.href = order.payment_url;

        } catch (error) {
            console.error('Error creando orden en WooCommerce:', error);
            alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="cart-page container">
            <PageMeta title="Checkout" description="Finaliza tu compra de forma segura." />
            <h1 className="cart-title">Finalizar Compra</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
                Completa tus datos para finalizar tu pedido.
            </p>

            <div className="cart-grid">
                {/* Left: Form */}
                <div className="checkout-form-container">
                    <form id="checkoutForm" onSubmit={handleSubmit} className="checkout-form">
                        <h3>Datos de Envío</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Apellido</label>
                                <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Dirección</label>
                            <input required type="text" name="address" value={formData.address} onChange={handleInputChange} />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Ciudad</label>
                                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Región</label>
                                <select required name="region" value={formData.region} onChange={handleInputChange}>
                                    <option value="">Selecciona...</option>
                                    <option value="RM">Metropolitana</option>
                                    <option value="V">Valparaíso</option>
                                    <option value="VIII">Biobío</option>
                                </select>
                            </div>
                        </div>

                        <h3>Pago</h3>
                        <div className="payment-mock mp-payment">
                            <div className="payment-header">
                                <span style={{ fontWeight: '800' }}>Pago Seguro</span>
                            </div>
                            <div className="payment-option selected">
                                <div className="mp-radio"></div>
                                <span>Serás redirigido al gateway de pago al confirmar</span>
                            </div>
                            <p className="payment-note">
                                Estás en un servidor seguro. Al confirmar, serás redirigido para completar el pago.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Right: Order Summary */}
                <div className="cart-summary">
                    <h2>Tu Pedido</h2>
                    <div className="order-items-preview">
                        {cartItems.map(item => (
                            <div key={`${item.id}-${item.size}`} className="order-preview-row">
                                <img src={item.image} alt={item.title} className="order-preview-image" />
                                <div className="order-preview-details">
                                    <span className="order-preview-title">{item.title}</span>
                                    <span className="order-preview-qty">Cant: {item.quantity}</span>
                                </div>
                                <span className="order-preview-price">
                                    ${(item.price * item.quantity).toLocaleString('es-CL')}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="summary-row">
                        <span>Envío (Blue Express)</span>
                        <span>
                            {shippingLoading
                                ? 'Calculando...'
                                : shippingCost > 0
                                    ? `$${shippingCost.toLocaleString('es-CL')}`
                                    : 'A calcular'}
                        </span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                        <span>Total a Pagar</span>
                        <span>${orderTotal.toLocaleString('es-CL')}</span>
                    </div>
                    <button
                        type="submit"
                        form="checkoutForm"
                        className="btn btn-primary btn-block mp-btn"
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Procesando...' : 'Confirmar y Pagar'}
                    </button>
                    <Link to="/cart" className="continue-shopping" style={{ marginTop: '1rem' }}>
                        Volver al carrito
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
