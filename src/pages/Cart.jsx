
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import { useCart } from '../context/CartContext';
import { trackViewCart, trackRemoveFromCart, trackBeginCheckout } from '../utils/analytics';
import './Cart.css';

const Cart = () => {
    const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (cartItems.length > 0) {
            trackViewCart(cartItems, cartTotal);
        }
    }, [cartItems, cartTotal]);

    if (cartItems.length === 0) {
        return (
            <div className="cart-page empty-cart-container">
                <h1>Tu Carrito</h1>
                <p>Tu carrito está vacío.</p>
                <Link to="/" className="btn btn-primary">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <PageMeta title="Tu Carrito" description="Revisa tu selección antes de comprar." />
            <h1 className="cart-title">Tu Carrito ({cartItems.length})</h1>

            {/* Free Shipping Progress */}
            {cartTotal < 100000 ? (
                <div className="shipping-alert">
                    Te faltan <strong>${(100000 - cartTotal).toLocaleString('es-CL')}</strong> para envío gratis.
                </div>
            ) : (
                <div className="shipping-alert success">
                    ¡Felicidades! Tienes <strong>envío gratis</strong> en tu pedido.
                </div>
            )}

            <div className="cart-grid">
                {/* Cart Items List */}
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="cart-item-details">
                                <div className="item-info-top">
                                    <h3>{item.title}</h3>
                                    <p className="item-category">{item.category}</p>
                                    <p className="item-size">Talla: {item.size}</p>
                                </div>
                                <div className="item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.size, 1)}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => {
                                            trackRemoveFromCart(item);
                                            removeFromCart(item.id, item.size);
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="cart-item-price">
                                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(item.price * item.quantity)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="cart-summary">
                    <h2>Resumen de Compra</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="summary-row">
                        <span>Envío</span>
                        <span>Por calcular</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${cartTotal.toLocaleString('es-CL')}</span>
                    </div>
                    <button
                        className="btn btn-primary btn-block checkout-btn"
                        onClick={() => {
                            trackBeginCheckout(cartItems, cartTotal);
                            navigate('/checkout');
                        }}
                    >
                        Finalizar compra
                    </button>
                    <Link to="/" className="continue-shopping">
                        <ArrowLeft size={16} /> Seguir comprando
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
