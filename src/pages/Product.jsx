import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Shield, Truck, CreditCard, ThumbsUp } from 'lucide-react';
import { trackViewItem, trackAddToCart } from '../utils/analytics';
import './Product.css';

// Accordion Component for IKEA-style cleaner UI
const Accordion = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className={`pdp-accordion ${isOpen ? 'open' : ''}`}>
            <button className="pdp-accordion-header" onClick={() => setIsOpen(!isOpen)} type="button">
                <span>{title}</span>
                <span className="pdp-accordion-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="pdp-accordion-content">
                <div className="pdp-accordion-inner">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Product = () => {
    const { id, slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { getProductById, getProductBySlug, products, loading } = useProducts();
    const [selectedSize, setSelectedSize] = useState(null);
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        if (!loading && products.length > 0) {
            let found = null;
            if (slug) {
                found = getProductBySlug(slug);
            } else if (id) {
                found = getProductById(id);
            }
            setProduct(found || null);
            if (found) {
                trackViewItem(found);
                
                // Set initial active image
                if (found.images && found.images.length > 0) {
                    setActiveImage(found.images[0]);
                } else {
                    setActiveImage(found.image);
                }
            }
        }
    }, [id, slug, products, loading, getProductById, getProductBySlug]);

    if (loading) return <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando producto...</div>;
    if (!product) return <div style={{ padding: '4rem', textAlign: 'center' }}>Producto no encontrado. <Link to="/">Volver al inicio</Link></div>;

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Por favor selecciona una talla");
            return;
        }
        trackAddToCart(product, selectedSize, 1);
        addToCart(product, selectedSize);
        navigate('/cart');
    };

    const RELATED = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

    // Schema.org Data
    const productSchema = product ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": `https://lukstore.cl${product.image}`,
        "description": product.seo?.description || product.description,
        "brand": {
            "@type": "Brand",
            "name": product.specs?.brand || "Lukstore"
        },
        "sku": product.sku,
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "CLP",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": product.condition === 'new' ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition"
        }
    } : null;

    const crumbs = [
        { label: 'Home', url: '/' },
        ...(product?.hierarchy ? product.hierarchy.map((h, i) => ({
            label: h,
            url: `/${product.hierarchy.slice(0, i + 1).map(x => x.toLowerCase().replace(/ /g, '-')).join('/')}`
        })) : [])
    ];

    const h1Title = `${product.title} ${product.condition === 'new' ? '' : '- Pre-Loved'}`;

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
                {/* Left: Gallery with Thumbnails */}
                <div className="product-gallery">
                    <nav className="breadcrumbs-container">
                        {crumbs.map((c, i) => (
                            <span key={i}>
                                <Link to={c.url} className={i === crumbs.length -1 ? 'active' : ''}>{c.label}</Link>
                                {i < crumbs.length - 1 && <span className="breadcrumb-separator">/</span>}
                            </span>
                        ))}
                    </nav>

                    <div className="main-image-container">
                        <img 
                            src={activeImage || productImages[0]} 
                            alt={`${product.title} vista principal`} 
                            className="main-image zoom-effect" 
                        />
                        {product.condition === 'used' && <span className="pdp-badge pdp-badge-used">Pre-Loved</span>}
                        {product.stock <= 2 && product.stock > 0 && <span className="pdp-badge pdp-badge-low-stock">¡Últimos pares!</span>}
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    {productImages.length > 1 && (
                        <div className="thumbnail-gallery">
                            {productImages.map((imgSrc, index) => (
                                <button 
                                    key={index}
                                    className={`thumbnail-btn ${activeImage === imgSrc ? 'active' : ''}`}
                                    onClick={() => setActiveImage(imgSrc)}
                                    aria-label={`Ver imagen ${index + 1}`}
                                    type="button"
                                >
                                    <img src={imgSrc} alt={`${product.title} miniatura ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Sticky Info */}
                <div className="product-sidebar">
                    <div className="product-sticky-info">
                        <div className="p-header">
                            <span className="p-brand">
                                {product.specs?.brand || product.brand} {product.specs?.releaseYear ? `/ ${product.specs.releaseYear}` : ''}
                            </span>
                            <h1 className="p-title">{h1Title}</h1>
                            <p className="p-price">
                                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.price)}
                            </p>
                        </div>

                        <div className="size-selector">
                            <div className="size-header">
                                <label>Tallas disponibles (US)</label>
                                <button className="size-guide-link" type="button">Guía de tallas</button>
                            </div>
                            <div className="size-grid">
                                {(product.sizes || []).map(s => (
                                    <button
                                        key={s.size}
                                        className={`size-btn ${selectedSize === s.size ? 'active' : ''} ${s.stock === 0 ? 'disabled' : ''}`}
                                        onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                                        disabled={s.stock === 0}
                                        type="button"
                                    >
                                        <span className="size-label">{s.size.replace(' us', '').replace(' US', '').toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-actions">
                            <button
                                className="btn btn-primary add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Añadir a la cesta
                            </button>
                        </div>

                        {/* Info Accordions */}
                        <div className="p-accordions">
                            <Accordion title="Descripción" defaultOpen={true}>
                                {product.longDescription ? (
                                    <div className="richtext" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                                ) : (
                                    <p>{product.description || product.shortDescription}</p>
                                )}
                            </Accordion>

                            <Accordion title="Condición">
                                <p>
                                    <strong>{product.condition === 'new' ? 'Nuevo / Deadstock (DS)' : 'Pre-Loved / Usado'}</strong><br/>
                                    {product.condition === 'new'
                                        ? 'Producto 100% nuevo y sin uso. Autenticidad garantizada y verificado por nuestros expertos. Incluye caja original y accesorios correspondientes.'
                                        : 'Producto usado en excelente estado. Ha pasado por nuestro riguroso control de calidad para garantizar su autenticidad y condición funcional.'}
                                </p>
                            </Accordion>

                            <Accordion title="Envío y Devoluciones">
                                <ul className="info-list">
                                    <li><Truck size={16}/> Envío a todo Chile vía Starken o Chilexpress.</li>
                                    <li><Shield size={16}/> Autenticidad 100% garantizada en todos nuestros productos.</li>
                                    <li><CreditCard size={16}/> Compra segura. Aceptamos múltiples métodos de pago.</li>
                                </ul>
                                <p style={{marginTop: '0.5rem', fontSize: '0.85rem', color: '#666'}}>
                                    Revisa nuestras políticas completas de <Link to="/support/shipping">envíos</Link> y <Link to="/support/returns">devoluciones</Link>.
                                </p>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {RELATED.length > 0 && (
                <div className="related-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Productos Similares</h2>
                        </div>
                        <div className="grid product-grid">
                            {RELATED.map(p => <ProductCard key={p.id} {...p} />)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
