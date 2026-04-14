import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { PageMeta } from '../hooks/usePageMeta';
import { trackViewItemList } from '../utils/ecommerceTracker';
import './Search.css';

const Search = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';
    const { products, loading } = useProducts();

    const results = useMemo(() => {
        if (!query) return [];
        return products.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            (p.hierarchy && p.hierarchy.some(cat => cat.toLowerCase().includes(query.toLowerCase())))
        );
    }, [products, query]);

    React.useEffect(() => {
        if (results.length > 0) {
            trackViewItemList(results, `Búsqueda: ${query}`, 'search_results');
        }
    }, [results, query]);

    return (
        <div className="search-page">
            <PageMeta title={`Resultados para "${query}"`} description={`Resultados de búsqueda para ${query} en Lukstore.`} />
            <div className="container">
                <div className="search-header">
                    <h1>Resultados para: &quot;{query}&quot;</h1>
                    {!loading && <p>{results.length} {results.length === 1 ? 'resultado' : 'resultados'} encontrados</p>}
                </div>

                {loading ? (
                    <div style={{ padding: '3rem 0', textAlign: 'center' }}>Cargando...</div>
                ) : results.length > 0 ? (
                    <div className="search-grid">
                        {results.map(p => <ProductCard key={p.id} {...p} />)}
                    </div>
                ) : (
                    <div style={{ padding: '3rem 0', textAlign: 'center' }}>
                        <h3>No encontramos resultados para &quot;{query}&quot;</h3>
                        <p style={{ marginTop: '0.5rem', color: '#666' }}>Intentá con otra palabra clave o revisá nuestras categorías.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
