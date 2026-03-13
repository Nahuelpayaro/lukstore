import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { PageMeta } from '../hooks/usePageMeta';
import { trackViewItemList } from '../utils/analytics';
import './Category.css'; // Re-use category grid styles

const Search = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';
    const { products, loading } = useProducts();

    // Live search filter
    const results = useMemo(() => {
        if (!query) return [];
        return products.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            (p.hierarchy && p.hierarchy.some(cat => cat.toLowerCase().includes(query.toLowerCase())))
        );
    }, [products, query]);

    // GA4 Tracking
    React.useEffect(() => {
        if (results.length > 0) {
            trackViewItemList(results, `Búsqueda: ${query}`, `search_results`);
        }
    }, [results, query]);

    return (
        <div className="category-page">
            <PageMeta title={`Resultados para "${query}"`} description={`Resultados de búsqueda para ${query} en Lukstore.`} />

            <div className="container breadcrumbs" style={{ marginTop: '2rem' }}>
                <span>Home</span> / <span className="current">Búsqueda</span>
            </div>

            <section className="container cat-body">
                <div className="cat-products" style={{ width: '100%' }}> {/* Full width, no sidebar */}
                    <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Resultados para: "{query}"</h2>

                    {loading ? (
                        <div style={{ padding: '3rem 0', textAlign: 'center' }}>Cargando...</div>
                    ) : results.length > 0 ? (
                        <div className="grid product-grid">
                            {results.map(p => <ProductCard key={p.id} {...p} />)}
                        </div>
                    ) : (
                        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
                            <h3>No encontramos resultados.</h3>
                            <p>Intenta con otra palabra clave o revisa nuestras categorías.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Search;
