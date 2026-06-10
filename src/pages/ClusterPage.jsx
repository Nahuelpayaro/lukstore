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

// Normalize string for diacritics-insensitive comparison
const normalizeStr = (str) =>
    str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Price range definitions (CLP). Covers budget to premium sneaker market.
const PRICE_RANGES = [
    { value: 'all', label: 'Precio: Todos' },
    { value: '0-80000', label: 'Hasta $80.000' },
    { value: '80000-150000', label: '$80.000 – $150.000' },
    { value: '150000-250000', label: '$150.000 – $250.000' },
    { value: '250000+', label: 'Más de $250.000' },
];

// Half-open intervals so boundary prices match exactly one bucket
const matchesPriceRange = (price, range) => {
    if (range === 'all') return true;
    if (range === '250000+') return price >= 250000;
    const [min, max] = range.split('-').map(Number);
    return price >= min && price < max;
};

const ClusterPage = () => {
    const { category, brand, model } = useParams();
    const [filters, setFilters] = useState({
        sort: 'featured',
        size: 'all',
        price: 'all',
        name: '',
    });
    const { getImage } = useCategories();
    const { products, loading } = useProducts();

    // 1. Resolve Active Content (Hierarchy or Main Category)
    const activeContent = useMemo(() => {
        if (brand || model) return getClusterData(category, brand, model);
        return getCategoryContent(category);
    }, [category, brand, model]);

    // 2. Resolve products for this route (before user filters — also feeds size options)
    const routeProducts = useMemo(() => {
        if (!products.length) return [];

        const catLower = category ? category.toLowerCase() : '';
        const isGenderPage = catLower === 'hombre' || catLower === 'mujer';
        const isRootCatalog = catLower === 'zapatillas';

        return products.filter(p => {
            const h = (p.hierarchy || []).map(x => x.toLowerCase());

            // /zapatillas → full catalog
            if (isRootCatalog && !brand && !model) return true;

            // /hombre or /mujer → only explicitly-gendered products
            if (isGenderPage && !brand && !model) {
                const pGender = (p.gender || '').toLowerCase();
                return pGender === catLower;
            }

            // Sub-routes with brand/model
            const pGender = (p.gender || '').toLowerCase();
            const catMatch = !category || h.includes(catLower) ||
                (isGenderPage && pGender === catLower);
            const brandMatch = !brand || h.includes(brand.toLowerCase());
            const modelMatch = !model || h.includes(model.replace(/-/g, ' ').toLowerCase());

            return catMatch && brandMatch && modelMatch;
        });
    }, [products, category, brand, model]);

    // Size options derived from actual product data; 'Única' is the no-size fallback
    const availableSizes = useMemo(() => {
        const sizes = new Set();
        routeProducts.forEach(p => (p.sizes || []).forEach(s => {
            if (s.size && s.size !== 'Única') sizes.add(s.size);
        }));
        return [...sizes].sort((a, b) => {
            const na = parseFloat(a.replace(/[^\d.]/g, ''));
            const nb = parseFloat(b.replace(/[^\d.]/g, ''));
            // Numeric sizes first in order; non-numeric (S/M/L) after, alphabetically
            if (!isNaN(na) && !isNaN(nb)) return na - nb;
            if (!isNaN(na)) return -1;
            if (!isNaN(nb)) return 1;
            return a.localeCompare(b);
        });
    }, [routeProducts]);

    // 3. Apply user filters and sorting
    const filteredProducts = useMemo(() => {
        let result = [...routeProducts];

        // Apply name search (NFD-normalized, case-insensitive)
        if (filters.name.trim()) {
            const q = normalizeStr(filters.name.trim());
            result = result.filter(p => normalizeStr(p.title ?? '').includes(q));
        }

        // Apply size filter (sizes is an array of { size, stock })
        if (filters.size !== 'all') {
            result = result.filter(p =>
                Array.isArray(p.sizes) && p.sizes.some(s => s.size === filters.size)
            );
        }

        // Apply price range filter
        if (filters.price !== 'all') {
            result = result.filter(p => matchesPriceRange(p.price, filters.price));
        }

        // Sort: featured-first default, or price overrides
        if (filters.sort === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        } else {
            // featured-first: isFeatured products lead, relative order preserved
            result.sort((a, b) => {
                if (a.isFeatured === b.isFeatured) return 0;
                return a.isFeatured ? -1 : 1;
            });
        }

        return result;
    }, [routeProducts, filters]);

    // Reset user filters when navigating between cluster routes
    useEffect(() => {
        setFilters({ sort: 'featured', size: 'all', price: 'all', name: '' });
    }, [category, brand, model]);

    // GA4 Tracking — debounced so typing in the search input fires one event, not one per keystroke
    useEffect(() => {
        if (filteredProducts.length === 0) return;
        const timer = setTimeout(() => {
            const listTitle = category?.toUpperCase() || 'CLUSTER';
            trackViewItemList(filteredProducts, `cluster_${listTitle.toLowerCase()}`, `Cluster: ${listTitle}`);
        }, 500);
        return () => clearTimeout(timer);
    }, [filteredProducts, category]);

    // Metadata
    const title = activeContent?.hero?.title || activeContent?.title || category?.toUpperCase();
    const description = activeContent?.hero?.subtitle || activeContent?.description || `Explora lo mejor de ${category} en Lukstore.`;
    const heroImage = activeContent?.hero?.image
        || activeContent?.heroImage
        || getImage(brand || category, null)
        || img('clusterFallback');
    const heroPosition = activeContent?.hero?.position || 'center';

    const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    const clearFilters = () => setFilters({ sort: 'featured', size: 'all', price: 'all', name: '' });

    const hasActiveFilters = filters.name.trim() || filters.size !== 'all' || filters.price !== 'all';

    if (loading) return <div style={{ height: '60vh' }} />;

    return (
        <div className="cluster-page-v2">
            <PageMeta title={title} description={description} />

            {/* 1. HERO EDITORIAL */}
            <header className="cluster-hero" style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: heroPosition }}>
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

            {/* 2. STICKY NAV & FILTERS */}
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
                        <input
                            type="text"
                            className="pill-search"
                            placeholder="Buscar..."
                            value={filters.name}
                            onChange={(e) => handleFilterChange('name', e.target.value)}
                        />
                        <select className="pill-select" value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
                            <option value="featured">Destacados primero</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                        </select>
                        <select className="pill-select" value={filters.price} onChange={(e) => handleFilterChange('price', e.target.value)}>
                            {PRICE_RANGES.map(r => (
                                <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                        </select>
                        {availableSizes.length > 0 && (
                            <select className="pill-select" value={filters.size} onChange={(e) => handleFilterChange('size', e.target.value)}>
                                <option value="all">Talla: Todas</option>
                                {availableSizes.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </nav>

            <main className="container cluster-main">
                {/* 3. UNIFIED PRODUCT GRID */}
                <section className="section-padding">
                    <div className="section-header">
                        <h2>{title}</h2>
                        <p className="section-sub">{filteredProducts.length} productos encontrados.</p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="main-cluster-grid">
                            {filteredProducts.map(p => <ProductCard key={p.id} {...p} />)}
                        </div>
                    ) : (
                        <div className="cluster-empty-state">
                            <p className="empty-state-message">No encontramos productos con esos filtros.</p>
                            {hasActiveFilters && (
                                <button className="btn-clear-filters" onClick={clearFilters}>
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    )}
                </section>

                {/* 4. EXPLORAR POR CLUSTERS (SUBCATEGORÍAS) */}
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

                {/* 5. SEO BLOCK */}
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
