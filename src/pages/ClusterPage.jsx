import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageMeta } from '../hooks/usePageMeta';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { getClusterData } from '../data/clusters';
import { getCategoryContent } from '../data/categoryContent';
import { trackViewItemList } from '../utils/ecommerceTracker';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { img } from '../data/siteConfig';
import './ClusterPage.css';

const ClusterPage = () => {
    const { category, brand, model } = useParams();
    const [filters, setFilters] = useState({ sort: 'newest', size: 'all' });
    const { getImage } = useCategories();
    const { products, loading } = useProducts();

    // 1. Resolve Active Content (Hierarchy or Main Category)
    const activeContent = useMemo(() => {
        if (brand || model) return getClusterData(category, brand, model);
        return getCategoryContent(category);
    }, [category, brand, model]);

    // 2. Resolve Products for this page
    const filteredProducts = useMemo(() => {
        if (!products.length) return [];

        const catLower = category ? category.toLowerCase() : '';
        const isGenderPage = catLower === 'hombre' || catLower === 'mujer';
        const isRootCatalog = catLower === 'zapatillas';

        let result = products.filter(p => {
            const h = (p.hierarchy || []).map(x => x.toLowerCase());

            // /zapatillas → catálogo completo
            if (isRootCatalog && !brand && !model) return true;

            // /hombre o /mujer → solo productos explícitamente de ese género
            if (isGenderPage && !brand && !model) {
                const pGender = (p.gender || '').toLowerCase();
                return pGender === catLower;
            }

            // Sub-rutas con brand/model
            const pGender = (p.gender || '').toLowerCase();
            const catMatch = !category || h.includes(catLower) ||
                (isGenderPage && pGender === catLower);
            const brandMatch = !brand || h.includes(brand.toLowerCase());
            const modelMatch = !model || h.includes(model.replace(/-/g, ' ').toLowerCase());

            return catMatch && brandMatch && modelMatch;
        });

        if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
        else if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);

        return result;
    }, [products, category, brand, model, filters]);

    // GA4 Tracking
    useEffect(() => {
        if (filteredProducts.length > 0) {
            const listTitle = category?.toUpperCase() || 'CLUSTER';
            trackViewItemList(filteredProducts, `cluster_${listTitle.toLowerCase()}`, `Cluster: ${listTitle}`);
        }
    }, [filteredProducts, category]);

    // "Más elegidos": featured primero, si no hay suficientes toma los primeros
    const bestSellers = useMemo(() => {
        const featured = filteredProducts.filter(p => p.isFeatured);
        return (featured.length >= 2 ? featured : filteredProducts).slice(0, 4);
    }, [filteredProducts]);

    // Remaining products: todo lo que no está en bestSellers
    const remainingProducts = useMemo(() => {
        const bestIds = new Set(bestSellers.map(p => p.id));
        return filteredProducts.filter(p => !bestIds.has(p.id));
    }, [filteredProducts, bestSellers]);

    // Metadata
    const title = activeContent?.hero?.title || activeContent?.title || category?.toUpperCase();
    const description = activeContent?.hero?.subtitle || activeContent?.description || `Explora lo mejor de ${category} en Lukstore.`;
    const heroImage = activeContent?.hero?.image
        || activeContent?.heroImage
        || getImage(brand || category, null)
        || img('clusterFallback');

    const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    if (loading) return <div style={{ height: '60vh' }} />;

    return (
        <div className="cluster-page-v2">
            <PageMeta title={`${title} | LUKSTORE`} description={description} />

            {/* 1. HERO EDITORIAL */}
            <header className="cluster-hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {description}
                    </motion.p>
                </div>
            </header>

            {/* 2. STICKY NAV & FILTERS (IKEA Style Pills) */}
            <nav className="cluster-nav-sticky">
                <div className="container nav-flex">
                    <div className="breadcrumb-wrapper">
                        <Breadcrumbs items={[
                            { label: category?.charAt(0).toUpperCase() + category?.slice(1), url: `/${category}` },
                            ...(brand ? [{ label: brand.charAt(0).toUpperCase() + brand.slice(1), url: `/${category}/${brand}` }] : []),
                            ...(model ? [{ label: model.replace(/-/g, ' '), url: `/${category}/${brand}/${model}` }] : [])
                        ]} />
                    </div>
                    <div className="filter-pills">
                        <select className="pill-select" value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
                            <option value="newest">Más nuevos</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                        </select>
                        <select className="pill-select" value={filters.size} onChange={(e) => handleFilterChange('size', e.target.value)}>
                            <option value="all">Talla: Todas</option>
                            <option value="7">US 7</option>
                            <option value="8">US 8</option>
                            <option value="9">US 9</option>
                            <option value="10">US 10</option>
                        </select>
                    </div>
                </div>
            </nav>

            <main className="container cluster-main">
                {/* 3. MÁS VENDIDOS / SELECCIÓN INICIAL */}
                {bestSellers.length > 0 && (
                    <section className="section-padding">
                        <div className="section-header">
                            <h2>Más elegidos</h2>
                            <p className="section-sub">Los favoritos de la comunidad este mes.</p>
                        </div>
                        <div className="best-sellers-grid">
                            {bestSellers.map(p => <ProductCard key={p.id} {...p} />)}
                        </div>
                    </section>
                )}

                {/* 4. GRID COMPLETO */}
                {remainingProducts.length > 0 && (
                    <section className="section-padding">
                        <div className="section-header">
                            <h2>Catálogo Completo</h2>
                            <p className="section-sub">{filteredProducts.length} productos encontrados.</p>
                        </div>
                        <div className="main-cluster-grid">
                            {remainingProducts.map(p => <ProductCard key={p.id} {...p} />)}
                        </div>
                    </section>
                )}

                {/* 6. EXPLORAR POR CLUSTERS (SUBCATEGORÍAS) */}
                {activeContent?.clusters && (
                    <section className="section-padding clusters-section">
                        <div className="section-header">
                            <h2>Explorar Colecciones</h2>
                        </div>
                        <div className="clusters-row">
                            {activeContent.clusters.map(c => (
                                <Link key={c.id} to={c.link} className="cluster-card-mini">
                                    <div className="cm-img"><img src={c.image} alt={c.label} /></div>
                                    <span>{c.label}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 7. SEO BLOCK */}
                {activeContent?.seo && (
                    <section className="section-padding seo-optimized-section">
                        <details className="seo-details">
                            <summary className="seo-summary">
                                <h3>{activeContent.seo.h1}</h3>
                                <span className="view-more-text">Leer más</span>
                            </summary>
                            <div className="seo-content-expand">
                                <p>{activeContent.seo.text}</p>
                                {activeContent.seo.faqs && (
                                    <div className="seo-faqs">
                                        {activeContent.seo.faqs.map((faq, i) => (
                                            <div key={i} className="faq-item">
                                                <strong>{faq.q}</strong>
                                                <p>{faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </details>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ClusterPage;
