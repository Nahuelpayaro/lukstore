import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageMeta } from '../../hooks/usePageMeta';
import { getBlogPost } from '../../data/blog';
import '../Home.css'; // Utilizing shared styles

const BlogPost = () => {
    const { slug } = useParams();
    const post = getBlogPost(slug);

    if (!post) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
                <h1>Artículo no encontrado</h1>
                <Link to="/blog" className="btn btn-primary" style={{ marginTop: '20px' }}>Volver al Blog</Link>
            </div>
        );
    }

    return (
        <div className="blog-post-page" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
            <PageMeta title={`${post.title} | Journal`} description={post.excerpt} />

            <article className="container" style={{ maxWidth: '800px' }}>
                {/* Header */}
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <span className="j-tag" style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>{post.category}</span>
                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>{post.title}</h1>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>{post.date} · Por Lukstore Editorial</p>
                </header>

                {/* Hero Image */}
                <div style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: '3rem',
                    borderRadius: '4px'
                }}></div>

                {/* Content */}
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                {/* Footer/Share */}
                <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>¿Te gustó este artículo? Compártelo.</p>
                    <Link to="/blog" className="btn btn-outline">Volver a News & Culture</Link>
                </div>
            </article>

            <style>{`
                .blog-content {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #333;
                }
                .blog-content h2 {
                    font-size: 1.8rem;
                    margin-top: 2.5rem;
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                }
                .blog-content h3 {
                    font-size: 1.4rem;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 600;
                }
                .blog-content p {
                    margin-bottom: 1.5rem;
                }
                .blog-content ul, .blog-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .blog-content li {
                    margin-bottom: 0.5rem;
                }
                .blog-content strong {
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

export default BlogPost;
