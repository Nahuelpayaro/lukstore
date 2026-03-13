import React from 'react';
import ProductCard from '../components/ProductCard';
import { PageMeta } from '../hooks/usePageMeta';
import SEOBlock from '../components/SEOBlock';
import './Category.css';

import { useProducts } from '../hooks/useProducts';
import { trackViewItemList } from '../utils/analytics';

// Content Config
const CATEGORY_META = {
    basketball: {
        title: "Basketball Heritage",
        description: "Modelos con origen, silueta y uso real. Zapatillas que definieron la cultura y el juego.",
        image: "/assets/cat-basketball.png",
        seoText: "Nuestra colección de Basketball Heritage no es solo nostalgia. Es rendimiento y estilo que trasciende la cancha. Encuentra desde Jordan Retro clásicas hasta las últimas firmas de atletas que están cambiando el juego hoy."
    },
    streetwear: {
        title: "Streetwear Selected",
        description: "Streetwear funcional. Corte, material y actitud. Piezas seleccionadas para el día a día.",
        image: "/assets/hero-street-editorial.png", // More editorial/lifestyle vibe
        seoText: "El streetwear es más que logotipos. Es sobre la calidad del algodón, el corte oversized perfecto y la durabilidad de las prendas. En Lukstore seleccionamos hoodies, poleras y pantalones que resisten el uso diario con estilo."
    },
    drops: {
        title: "Limited Drops",
        description: "Lanzamientos especiales. Cuando se acaban, no vuelven. Sin hype falso.",
        image: "/assets/cat-drops.png",
        seoText: "Acceso exclusivo a los pares más codiciados de la temporada. Nuestra sección de Limited Drops se actualiza semanalmente con stock muy limitado. Recomendamos activar notificaciones y estar atento a nuestro Instagram."
    },
    accesorios: {
        title: "Accesorios",
        description: "Detalles que completan el fit. Gorros, calcetines y bolsos.",
        image: "/assets/banner-sale.png", // Using a dark/neutral banner for now
        seoText: "Complementos seleccionados para cerrar tu outfit. Desde gorros y calcetines hasta bolsos y joyería urbana. Calidad y diseño funcional."
    }
};

const Category = ({ type }) => {
    const meta = CATEGORY_META[type];
    const { getProductsByCategory, loading } = useProducts();
    const [products, setProducts] = React.useState([]);
    const [filters, setFilters] = React.useState({ size: 'all', sort: 'newest' });

    // Initial load & Filter logic
    React.useEffect(() => {
        if (loading) return;

        let result = getProductsByCategory(type);

        // Sort
        if (filters.sort === 'price-asc') {
            // Price is string "199.990", remove dots to sort numerically
            result.sort((a, b) => parseInt(String(a.price).replace(/\./g, '')) - parseInt(String(b.price).replace(/\./g, '')));
        } else if (filters.sort === 'price-desc') {
            result.sort((a, b) => parseInt(String(b.price).replace(/\./g, '')) - parseInt(String(a.price).replace(/\./g, '')));
        }

        setProducts([...result]);
    }, [type, filters, loading, getProductsByCategory]);

    // GA4 Tracking
    React.useEffect(() => {
        if (products.length > 0) {
            trackViewItemList(products, `Categoría: ${type}`, `cat_${type}`);
        }
    }, [products, type]);

    if (!meta) return <div>Category not found</div>;

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="category-page">
            <PageMeta title={meta ? meta.title : 'Categoría'} description={meta ? meta.description : ''} />
            {/* Hero Category */}
            <section className="cat-hero" style={{ backgroundImage: `url('${meta.image}')` }}>
                <div className="cat-hero-overlay"></div>
                <div className="container cat-hero-content">
                    <h1>{meta.title}</h1>
                    <p>{meta.description}</p>
                </div>
            </section>

            {/* Breadcrumbs (Visual only) */}
            <div className="container breadcrumbs">
                <span>Home</span> / <span className="current">{type}</span>
            </div>

            {/* Filters & Grid */}
            <section className="container cat-body">
                <aside className="cat-filters">
                    <h3>Filtros</h3>
                    <div className="filter-group">
                        <label>Talla</label>
                        <select value={filters.size} onChange={(e) => handleFilterChange('size', e.target.value)}>
                            <option value="all">Todas</option>
                            <option value="7">US 7</option>
                            <option value="8">US 8</option>
                            <option value="9">US 9</option>
                            <option value="10">US 10</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Ordenar por</label>
                        <select value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
                            <option value="newest">Más nuevos</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </aside>

                <div className="cat-products">
                    <div className="grid product-grid">
                        {products.map(p => <ProductCard key={p.id} {...p} />)}
                    </div>
                    {products.length === 0 && <p style={{ padding: '2rem', color: '#666' }}>No hay productos disponibles en esta categoría por el momento.</p>}
                </div>
            </section>

            {/* SGEO Text Block */}
            <SEOBlock title={`Sobre ${meta.title}`} content={meta.seoText} />
        </div>
    );
};

export default Category;
