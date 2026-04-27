import React, { useEffect, useMemo } from 'react';
import { img } from '../data/siteConfig';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageMeta } from '../hooks/usePageMeta';
import ProductCard from '../components/ProductCard';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { usePosts } from '../hooks/usePosts';
import { trackViewItemList } from '../utils/ecommerceTracker';
import './Home.css';

const Home = () => {
    const { getFeaturedProducts, loading, products } = useProducts();
    const { getImage } = useCategories();
    const { posts } = usePosts(3);
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
                        { title: 'Zapatillas', link: '/zapatillas', slug: 'zapatillas', fallback: '/assets/cat-basketball.png', size: 'large', pos: 'center center' },
                        { title: 'Hombre',     link: '/hombre',     slug: 'hombre',     fallback: '/assets/cat-streetwear.png', size: 'small', pos: 'center center' },
                        { title: 'Mujer',      link: '/mujer',      slug: 'mujer',      fallback: '/assets/hero-home.png', size: 'small', pos: 'center center' },
                        { title: 'Accesorios', link: '/accesorios', slug: 'accesorios', fallback: '/assets/hero-street-editorial.png', size: 'small', pos: 'center center' },
                        { title: 'Drops',      link: '/drops',      slug: 'drops',      fallback: '/assets/cat-drops.png', size: 'small', pos: 'center center' },
                    ].map((cat) => (
                        <motion.div key={cat.title} variants={fadeInUp} className={`cat-card ${cat.size}`}>
                            <Link to={cat.link}>
                                <div className="cat-card-bg" style={{ backgroundImage: `url(${getImage(cat.slug, cat.fallback)})`, backgroundPosition: cat.pos }} />
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
            <section className="banner-sale" style={{ backgroundImage: `url(${img('bannerDrops')})` }}>
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

            {/* 6. CLIENTES */}
            <section className="customers-section">
                <div className="customers-header">
                    <h2>📸 Confían en Lukstore</h2>
                    <p>Nuestros clientes eligen calidad, estilo y servicio real.</p>
                </div>
                <div className="customers-masonry">
                    {[
                        'IMG_3912','IMG_3913','IMG_3914','IMG_3915','IMG_3916',
                        'IMG_3917','IMG_3918','IMG_3919','IMG_3920','IMG_3921','IMG_3922'
                    ].map((name) => (
                        <div className="customers-photo" key={name}>
                            <img src={`/assets/feedback/${name}.PNG`} alt="Cliente Lukstore" loading="lazy" />
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. JOURNAL / BLOG */}
            {posts.length > 0 && (
                <section className="container journal-section">
                    <div className="section-header">
                        <h2>News & Culture</h2>
                        <Link to="/blog" className="link-arrow">Ver todo</Link>
                    </div>
                    <div className="journal-grid">
                        {posts.map((post) => (
                            <div className="journal-card" key={post.id}>
                                <div className="j-img" style={{ backgroundImage: `url(${post.image || img('clusterFallback')})` }}></div>
                                <div className="j-content">
                                    <span className="j-tag">{post.tag}</span>
                                    <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <a href={post.link} className="j-link">Leer nota</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 8. REDES SOCIALES */}
            <section className="redes-section">
                <div className="container">
                    <div className="redes-header">
                        <h2>Instagram</h2>
                        <p>Síguenos para ver nuestros nuevos productos ↓</p>
                    </div>
                    <div className="redes-grid">
                        {[
                            {
                                href: 'https://www.instagram.com/lukstore._/',
                                video: '/assets/redes-video-1.mp4',
                                username: '@lukstore._',
                                label: 'Tienda oficial',
                            },
                            {
                                href: 'https://www.instagram.com/lukstore._/',
                                image: '/assets/feedback/IMG_3912.PNG',
                                username: '@lukstore._',
                                label: 'Ver perfil',
                            },
                            {
                                href: 'https://www.instagram.com/lukstore._/',
                                video: '/assets/redes-video-2.mp4',
                                username: '@lukstore._',
                                label: 'Ver más',
                            },
                        ].map((card) => (
                            <a key={card.label} href={card.href} target="_blank" rel="noreferrer" className="redes-card">
                                {card.video ? (
                                    <video
                                        className="redes-video"
                                        src={card.video}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <div className="redes-card-bg" style={{ backgroundImage: `url(${card.image})` }} />
                                )}
                                <div className="redes-card-overlay" />
                                <div className="redes-card-footer">
                                    <div className="redes-platform-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="#000"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#000" strokeWidth="2"/></svg>
                                    </div>
                                    <div className="redes-card-info">
                                        <span className="redes-username">{card.username}</span>
                                        <span className="redes-label">{card.label}</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

        </div >
    );
};

export default Home;
