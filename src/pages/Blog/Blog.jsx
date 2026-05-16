import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../../hooks/usePageMeta';
import { BLOG_POSTS } from '../../data/blog';
import '../../components/Header.css'; // Reusing global styles
import '../Home.css'; // Reusing card styles

const Blog = () => {
    return (
        <div className="page-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <PageMeta title="News & Culture" description="Noticias, guías y cultura sneaker. Mantente al día con lo último del streetwear en Chile." />

            <div className="container">
                <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'center', display: 'block' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>NEWS & CULTURE</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>
                        Historias detrás del hype. Guías de cuidado y estilo.
                    </p>
                </div>

                <div className="journal-grid" style={{ marginBottom: '4rem' }}>
                    {BLOG_POSTS.map(post => (
                        <div className="journal-card" key={post.id}>
                            <div className="j-img" style={{ backgroundImage: `url(${post.image})` }}></div>
                            <div className="j-content">
                                <span className="j-tag">{post.category}</span>
                                <h3>{post.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem', lineHeight: '1.4' }}>{post.excerpt}</p>
                                <Link to={`/blog/${post.slug}`} className="j-link">Leer nota</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
