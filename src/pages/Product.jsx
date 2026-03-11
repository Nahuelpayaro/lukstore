import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { Shield, Truck, CreditCard, ThumbsUp } from 'lucide-react';
import './Product.css';

const Product = () => {
    const { id, slug } = useParams(); // Support both IDs and Slugs
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { getProductById, getProductBySlug, products, loading } = useProducts();
    const [selectedSize, setSelectedSize] = useState(null);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log("Product Page Params:", { id, slug });
        console.log("Products Available:", products.length);

        if (products.length > 0) {
            console.log("Available Slugs:", products.map(p => p.slug));
        }

        if (!loading && products.length > 0) {
            let found = null;
            if (slug) {
                found = getProductBySlug(slug);
                console.log("Searching by slug:", slug, "Found:", found);
            } else if (id) {
                found = getProductById(id);
                console.log("Searching by id:", id, "Found:", found);
            }
            setProduct(found || null);
        }
    }, [id, slug, products, loading, getProductById, getProductBySlug]);

    if (loading) return <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando producto...</div>;
    if (!product) return <div style={{ padding: '4rem', textAlign: 'center' }}>Producto no encontrado. <Link to="/">Volver al inicio</Link></div>;

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Por favor selecciona una talla");
            return;
        }
        addToCart(product, selectedSize);
        // Navigate to cart for feedback
        navigate('/cart');
    };

    // Filtramos productos relacionados por categoría
    const RELATED = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    // Schema.org Data
    const productSchema = product ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": `https://lukstore.cl${product.image}`, // Mock domain
        "description": product.seo?.description || product.description,
        "brand": {
            "@type": "Brand",
            "name": product.specs?.brand || "Lukstore"
        },
        "sku": product.sku,
        "offers": {
            "@type": "Offer",
            "url": window.location.href, // Dynamic URL
            "priceCurrency": "CLP",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": product.condition === 'new' ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": 0,
                    "currency": "CLP"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "d"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 2,
                        "maxValue": 5,
                        "unitCode": "d"
                    }
                }
            }
        }
    } : null;

    // Breadcrumbs
    const crumbs = [
        { label: 'Home', url: '/' },
        ...(product?.hierarchy ? product.hierarchy.map((h, i) => ({
            label: h,
            url: `/${product.hierarchy.slice(0, i + 1).map(x => x.toLowerCase().replace(/ /g, '-')).join('/')}`
        })) : [])
    ];

    // SEO Title Logic
    const h1Title = `${product.title} ${product.condition === 'new' ? '- Original' : '- Pre-Loved'} - Envío a todo Chile`;

    return (
        <div className="product-page">
            <PageMeta
                title={product.seo?.title || h1Title}
                description={product.seo?.description || `Compra ${product.title} en Lukstore. Garantía de autenticidad.`}
            />
            {productSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(productSchema)}
                </script>
            )}

            <div className="container product-main">
                {/* Breadcrumbs */}
                <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <nav className="breadcrumbs-container">
                        {crumbs.map((c, i) => (
                            <span key={i}>
                                <Link to={c.url} className={i === crumbs.length -1 ? 'active' : ''}>{c.label}</Link>
                                {i < crumbs.length - 1 && <span style={{ margin: '0 0.75rem', color: '#ccc' }}>/</span>}
                            </span>
                        ))}
                    </nav>
                </div>

                {/* Left: Gallery */}
                <div className="product-gallery">
                    <div className="main-image" style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                        <img src={product.image} alt={h1Title} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        {product.condition === 'used' && <span className="pdp-badge-used">Pre-Loved</span>}
                        {product.stock <= 2 && product.stock > 0 && <span className="badge-low-stock">¡Últimos pares!</span>}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="product-details">
                    <div className="p-header">
                        <span className="p-brand" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: '#999' }}>
                            {product.specs?.brand || product.brand} / {product.specs?.releaseYear || ''}
                        </span>
                        <h1 className="p-title">{h1Title}</h1>
                        <p className="p-price">
                            {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.price)}
                            {product.condition === 'used' && <span className="price-note"> (Pre-Loved)</span>}
                        </p>
                    </div>

                    <div className="p-condition-info">
                        <strong>
                            Estado: {product.condition === 'new' ? 'Nuevo / Deadstock (DS)' : 'Pre-Loved / Usado'}
                        </strong>
                        <p>
                            {product.condition === 'new'
                                ? 'Producto 100% nuevo, verificado por expertos. Caja original intacta.'
                                : 'Producto verificado. Condición certificada 9/10.'}
                        </p>
                    </div>

                    <div className="size-selector">
                        <div className="size-header">
                            <label>Seleccionar Talla (US)</label>
                            <Link to="/guia-tallas" className="size-guide-link">Ver guía de tallas</Link>
                        </div>
                        <div className="size-options">
                            {['7', '8', '8.5', '9', '10', '11', '12'].map(s => (
                                <button
                                    key={s}
                                    className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-actions" style={{ marginTop: '2rem' }}>
                        <button
                            className="btn btn-primary btn-block add-to-cart-btn"
                            onClick={handleAddToCart}
                        >
                            AGREGAR AL CARRITO
                        </button>

                        {/* TRUST SIGNALS BLOCK */}
                        <div className="trust-signals">
                            <div className="trust-item">
                                <Shield size={20} strokeWidth={1.5} />
                                <div>
                                    <strong>Autenticidad</strong>
                                    <span>100% Verificado</span>
                                </div>
                            </div>
                            <div className="trust-item">
                                <Truck size={20} strokeWidth={1.5} />
                                <div>
                                    <strong>Envío Rápido</strong>
                                    <span>Todo Chile</span>
                                </div>
                            </div>
                            <div className="trust-item">
                                <CreditCard size={20} strokeWidth={1.5} />
                                <div>
                                    <strong>Pago Seguro</strong>
                                    <span>Hasta 6 cuotas</span>
                                </div>
                            </div>
                            <div className="trust-item">
                                <ThumbsUp size={20} strokeWidth={1.5} />
                                <div>
                                    <strong>Garantía</strong>
                                    <span>Satisfacción total</span>
                                </div>
                            </div>
                        </div>

                        {/* LONG DESCRIPTION (HTML) */}
                        {product.longDescription ? (
                            <div className="p-long-desc" style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                                <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                            </div>
                        ) : (
                            <div className="p-short-desc" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold' }}>Descripción</h3>
                                <p style={{ lineHeight: '1.6', color: '#444' }}>{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related - Cross Sell */}
            <div className="container related-products" style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
                <div className="section-header">
                    <h2>También te podría interesar</h2>
                    <Link to="/hombre" className="link-arrow">Ver todo</Link>
                </div>
                <div className="grid product-grid">
                    {RELATED.map(p => <ProductCard key={p.id} {...p} />)}
                </div>
            </div>
        </div>
    );
};

export default Product;
