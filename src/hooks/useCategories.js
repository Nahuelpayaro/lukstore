import { useState, useEffect } from 'react';
import { getCategories } from '../lib/woocommerce';

// Fallback images if WooCommerce category has no image yet
const FALLBACKS = {
    zapatillas: '/assets/cat-basketball.png',
    hombre:     '/assets/cat-streetwear.png',
    mujer:      '/assets/hero-home.png',
    accesorios: '/assets/hero-street-editorial.png',
    drops:      '/assets/cat-drops.png',
};

export const useCategories = () => {
    const [categoryImages, setCategoryImages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories().then(cats => {
            const map = {};
            cats.forEach(cat => {
                const slug = cat.slug.toLowerCase();
                map[slug] = cat.image?.src || FALLBACKS[slug] || null;
            });
            setCategoryImages(map);
        }).catch(() => {
            setCategoryImages(FALLBACKS);
        }).finally(() => setLoading(false));
    }, []);

    const getImage = (slug, fallback) => {
        if (!slug) return fallback || '';
        const key = slug.toLowerCase();
        return categoryImages[key] || fallback || FALLBACKS[key] || '';
    };

    return { categoryImages, loading, getImage };
};
