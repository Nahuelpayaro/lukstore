import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../lib/woocommerce';
import { PRODUCTS } from '../data/products';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts().then(data => {
            setProducts(data.length > 0 ? data : PRODUCTS);
        }).catch(err => {
            console.error('[useProducts] Error cargando WooCommerce, usando datos locales:', err);
            setError(err);
            setProducts(PRODUCTS);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const getActiveDrops = useCallback(
        () => products.filter(p => p.isDrop),
        [products]
    );

    const getFeaturedProducts = useCallback(
        () => products.filter(p => p.isFeatured),
        [products]
    );

    const getUsedProducts = useCallback(
        () => products.filter(p => p.condition === 'used'),
        [products]
    );

    const getProductsByCategory = useCallback((cat) => {
        if (!products.length) return [];
        if (cat === 'drops') return getActiveDrops();

        const cleanCat = cat.toLowerCase();

        if (cleanCat === 'basketball') {
            return products.filter(p =>
                p.category === 'Zapatillas' ||
                (p.hierarchy && p.hierarchy[0] === 'Zapatillas')
            );
        }
        if (cleanCat === 'streetwear') {
            return products.filter(p =>
                p.category === 'Streetwear' ||
                (p.hierarchy && p.hierarchy[0] === 'Streetwear') ||
                p.gender === 'Unisex'
            );
        }

        return products.filter(p =>
            (p.category && p.category.toLowerCase().includes(cleanCat)) ||
            (p.hierarchy && p.hierarchy.some(h => h.toLowerCase().includes(cleanCat))) ||
            p.title.toLowerCase().includes(cleanCat) ||
            (p.tags && p.tags.some(t => t.includes(cleanCat)))
        );
    }, [products, getActiveDrops]);

    const getProductById = useCallback(
        (id) => products.find(p => p.id === id),
        [products]
    );

    const getProductBySlug = useCallback(
        (slug) => products.find(p => p.slug === slug),
        [products]
    );

    return {
        products,
        loading,
        error,
        getActiveDrops,
        getFeaturedProducts,
        getUsedProducts,
        getProductsByCategory,
        getProductById,
        getProductBySlug,
    };
};
