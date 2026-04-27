import { useState, useEffect } from 'react';

const WP_URL = (import.meta.env.VITE_WC_URL ?? '').replace(/\/$/, '');

export const usePosts = (limit = 3) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=${limit}&_embed&status=publish`)
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                const normalized = data.map(p => ({
                    id: p.id,
                    title: p.title?.rendered || '',
                    slug: p.slug,
                    tag: p._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog',
                    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
                    link: p.link,
                }));
                setPosts(normalized);
            })
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, [limit]);

    return { posts, loading };
};
