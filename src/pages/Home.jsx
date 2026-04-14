import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageMeta } from '../hooks/usePageMeta';
import ProductCard from '../components/ProductCard';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import { useProducts } from '../hooks/useProducts';
import { trackViewItemList } from '../utils/ecommerceTracker';
import './Home.css';

const Home = () => {
    const { getFeaturedProducts, loading, products } = useProducts();
    const newArrivals = useMemo(() => products.slice(0, 4), [products]);
    const featuredSelection = useMemo(() => getFeaturedProducts() || [], [products, getFeaturedProducts]);

    useEffect(() => {
        if (!loading && products.length > 0) {
            trackViewItemList(newArrivals, "home_new_arrivals", "Nuevos Ingresos");
            trackViewItemList(featuredSelection.slice(0, 4), "home_featured", "Selección Destacada");
        }
    }, [loading, products, newArrivals, featuredSelection]);

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    // No full-page loading — skeletons inline per section

    return (
        <div className="home-clean">
            <PageMeta title="Selected Street Goods" description="Zapatillas, ropa y accesorios urbanos seleccionados uno a uno." />

            {/* 1. HERO PRINCIPAL (Original Restored & Improved) */}
            <section className="hero-clean hero-original">
                <div className="hero-overlay-dark"></div>
                <div className="hero-content-original">
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-title-original"
                    >
                        SELECTED<br />STREET<br />GOODS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="hero-subtitle-original"
                    >
                        Zapatillas, ropa y accesorios urbanos seleccionados uno a uno.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hero-actions-original"
                    >
                        <Link to="/zapatillas" className="btn btn-black">VER ZAPATILLAS</Link>
                        <Link to="/drops" className="btn btn-transparent">VER DROPS</Link>
                    </motion.div>
                </div>
            </section>

            {/* 2. CATEGORÍAS */}
            <section className="categories-section">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="categories-grid"
                >
                    {[
                        { title: 'Zapatillas', link: '/zapatillas', image: '/assets/cat-basketball.png', size: 'large' },
                        { title: 'Hombre', link: '/hombre', image: '/assets/cat-streetwear.png', size: 'small' },
                        { title: 'Mujer', link: '/mujer', image: '/assets/hero-home.png', size: 'small' },
                        { title: 'Accesorios', link: '/accesorios', image: '/assets/hero-street-editorial.png', size: 'small' },
                        { title: 'Drops', link: '/drops', image: '/assets/cat-drops.png', size: 'small' },
                    ].map((cat) => (
                        <motion.div key={cat.title} variants={fadeInUp} className={`cat-card ${cat.size}`}>
                            <Link to={cat.link}>
                                <div className="cat-card-bg" style={{ backgroundImage: `url(${cat.image})` }} />
                                <div className="cat-card-overlay" />
                                <div className="cat-card-content">
                                    <h3>{cat.title}</h3>
                                    <span>Ver colección →</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 3. NUEVOS INGRESOS */}
            <section className="container product-section">
                <div className="section-header">
                    <h2>Nuevos Ingresos</h2>
                    <Link to="/zapatillas" className="link-arrow">Ver todo</Link>
                </div>
                {loading ? <ProductSkeletonGrid count={4} /> : (
                    <div className="product-grid">
                        {newArrivals.slice(0, 4).map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                )}
            </section>

            {/* 4. BANNER EDITORIAL */}
            <section className="banner-sale">
                <div className="banner-content">
                    <h2>NUEVOS DROPS</h2>
                    <p>Lanzamientos limitados. Cuando se acaban, no vuelven.</p>
                    <Link to="/drops" className="btn btn-white">Ver drops</Link>
                </div>
            </section>

            {/* 5. PRODUCTOS DESTACADOS */}
            <section className="container product-section">
                <div className="section-header">
                    <h2>Selección Destacada</h2>
                    <Link to="/drops" className="link-arrow">Ver selección</Link>
                </div>
                {loading ? <ProductSkeletonGrid count={4} /> : (
                    <div className="product-grid">
                        {featuredSelection.slice(0, 4).map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                )}
            </section>

            {/* 6. TESTIMONIOS */}
            <section className="container testimonials-section">
                <div className="section-header">
                    <h2>Trusted by the Culture</h2>
                    <div className="google-badge">
                        <span className="g-icon">G</span>
                        <div className="g-rating">
                            <strong>4.9</strong>
                            <span className="g-stars">★★★★★</span>
                            <span className="g-count">(142 reseñas)</span>
                        </div>
                    </div>
                </div>
                {/* 6 Grid Google Style */}
                <div className="testimonials-grid-scroll">
                    {[
                        { name: "Martín Velasco", date: "hace 2 días", text: "La curaduría es excelente. Encontré pares que no veía hace años en Chile. El envío fue rapidísimo y el packaging es otro nivel.", initial: "M" },
                        { name: "Sofia Andrade", date: "hace 1 semana", text: "Calidad impecable. Se nota que revisan cada detalle antes de enviar. 100% recomendado para quienes buscan streetwear real.", initial: "S" },
                        { name: "Camilo Rojas", date: "hace 3 semanas", text: "Atención personalizada y honesta. Te dicen la posta sobre el fit y el estado. Volveré a comprar seguro.", initial: "C" },
                        { name: "Andrés P.", date: "hace 1 mes", text: "Llegó al día siguiente en RM. Las Jordan 4 estaban pristine. Nada que envidiar a tiendas de USA.", initial: "A" },
                        { name: "Bea T.", date: "hace 1 mes", text: "Me ayudaron mucho con la talla por Instagram. El servicio al cliente es súper cercano, no como otras tiendas grandes.", initial: "B" },
                        { name: "Javier M.", date: "hace 2 meses", text: "Compré en el drop de Yeezy y todo fluyó perfecto. Sin bots, sin filas falsas. Experiencia de compra 10/10.", initial: "J" }
                    ].map((review, i) => (
                        <div className="google-review-card" key={i}>
                            <div className="gr-header">
                                <div className="gr-avatar" style={{ backgroundColor: ['#ea4335', '#4285f4', '#fbbc05', '#34a853', '#666', '#ea4335'][i] }}>{review.initial}</div>
                                <div className="gr-meta">
                                    <span className="gr-name">{review.name}</span>
                                    <div className="gr-rating-row">
                                        <span className="gr-stars">★★★★★</span>
                                        <span className="gr-date">{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="gr-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. JOURNAL / BLOG */}
            <section className="container journal-section">
                <div className="section-header">
                    <h2>News & Culture</h2>
                    <Link to="/blog" className="link-arrow">Ver todo</Link>
                </div>
                <div className="journal-grid">
                    <div className="journal-card">
                        <div className="j-img" style={{ backgroundImage: 'url(/assets/hero-street-editorial.png)' }}></div>
                        <div className="j-content">
                            <span className="j-tag">Cultura</span>
                            <h3>La historia detrás de las Jordan 4 &quot;Bred&quot;</h3>
                            <Link to="/blog/historia-jordan-4-bred" className="j-link">Leer nota</Link>
                        </div>
                    </div>
                    <div className="journal-card">
                        <div className="j-img" style={{ backgroundImage: 'url(/assets/cat-basketball.png)' }}></div>
                        <div className="j-content">
                            <span className="j-tag">Guías</span>
                            <h3>Cómo cuidar tus sneakers de gamuza</h3>
                            <Link to="/blog/cuidado-sneakers-gamuza" className="j-link">Leer nota</Link>
                        </div>
                    </div>
                    <div className="journal-card">
                        <div className="j-img" style={{ backgroundImage: 'url(/assets/cat-streetwear.png)' }}></div>
                        <div className="j-content">
                            <span className="j-tag">Estilo</span>
                            <h3>Essentials: 5 prendas para este invierno</h3>
                            <Link to="/blog/essentials-invierno" className="j-link">Leer nota</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. INSTAGRAM FEED */}
            <section className="instagram-section">
                <div className="container">
                    <div className="ig-header">
                        <h2>@lukstore._</h2>
                        <a href="https://www.instagram.com/lukstore._/" target="_blank" rel="noreferrer" className="btn btn-outline">Seguir en Instagram</a>
                    </div>
                    <div className="ig-grid">
                        {/* Instagram Feed - @lukstore._ */}
                        {[
                                '/assets/instagram/ig-1.jpg',
                                '/assets/instagram/ig-2.jpg',
                                '/assets/instagram/ig-3.jpg',
                                '/assets/instagram/ig-4.jpg',
                                '/assets/instagram/ig-5.jpg',
                                '/assets/instagram/ig-6.jpg',
                                '/assets/instagram/ig-7.jpg',
                                '/assets/instagram/ig-8.jpg',
                                '/assets/instagram/ig-9.jpg'
                            ].map((src, i) => (
                                <a key={i} href="https://www.instagram.com/lukstore._/" target="_blank" rel="noreferrer" className="ig-item">
                                    <img src={src} alt="Instagram Post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div className="ig-overlay"><span className="ig-icon">📸</span></div>
                                </a>
                            ))}
                    </div>
                </div>
            </section>

            {/* 9. CTA FINAL */}
            {/* 9. CTA FINAL VISUAL */}
            <section className="container final-cta-visual">
                <Link to="/hombre" className="cta-card">
                    <div className="cta-bg" style={{ backgroundImage: 'url(/assets/cat-streetwear.png)' }}></div>
                    <div className="cta-content">
                        <h2>Hombre</h2>
                        <span>Ver Colección</span>
                    </div>
                </Link>
                <Link to="/mujer" className="cta-card">
                    <div className="cta-bg" style={{ backgroundImage: 'url(/assets/hero-home.png)' }}></div>
                    <div className="cta-content">
                        <h2>Mujer</h2>
                        <span>Ver Colección</span>
                    </div>
                </Link>
            </section>
        </div >
    );
};

export default Home;
