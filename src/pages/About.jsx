import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <PageMeta
                title="Manifiesto Lukstore | Real Streetwear"
                description="No hype. Solo cultura. Lukstore es curaduría, autenticidad y respeto por el streetwear real."
            />
            {/* SEO Organization Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Lukstore",
                    "url": "https://lukstore.cl",
                    "logo": "https://lukstore.cl/assets/logo.png",
                    "description": "Curaduría real de streetwear. Zapatillas y ropa urbana seleccionada.",
                    "sameAs": ["https://instagram.com/lukstore"]
                })}
            </script>

            {/* HERO */}
            <section className="about-hero" style={{ backgroundImage: 'url(/assets/hero-about.png)' }}>
                <div className="about-hero-overlay"></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <h1>NO HYPE.<br />JUST CULTURE.</h1>
                </div>
            </section>

            {/* INTRO: QUIENES SOMOS */}
            <section className="about-intro-section">
                <div className="container">
                <div className="about-grid-intro">
                    <div className="about-text-col">
                        <span className="subtitle-small">Nuestra Historia</span>
                        <h2 className="section-title">Nacidos del Cemento</h2>
                        <p className="lead-text">
                            Lukstore no empezó en una oficina. Empezó en las filas de los drops, en los foros de compra-venta y en la búsqueda incansable del par perfecto.
                        </p>
                        <p>
                            Fundada en 2024 en Santiago, nuestra misión es simple: traer a Chile lo mejor del streetwear mundial sin el ruido, sin las réplicas y sin los precios abusivos. Somos coleccionistas sirviendo a coleccionistas.
                        </p>
                    </div>
                    <div className="about-img-col">
                        <img src="/assets/cat-streetwear.png" alt="Lukstore Origins" />
                    </div>
                </div>
                </div>
            </section>

            {/* TIMELINE / MILESTONES */}
            <section className="timeline-section">
                <div className="container">
                    <h2 className="section-title center">El Camino</h2>
                    <div className="timeline-grid">
                        <div className="timeline-item">
                            <span className="year">2020</span>
                            <h3>El Concepto</h3>
                            <p>La idea nace como un servicio de personal shopper exclusivo para amigos y familiares.</p>
                        </div>
                        <div className="timeline-item">
                            <span className="year">2023</span>
                            <h3>Primera Curaduría</h3>
                            <p>Viajes a USA y Japón para asegurar stock de siluetas imposibles de conseguir en Latam.</p>
                        </div>
                        <div className="timeline-item">
                            <span className="year">2024</span>
                            <h3>Lanzamiento Oficial</h3>
                            <p>Lukstore.cl abre sus puertas digitales. Sold out del primer drop en 24 horas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUES (SEO TRUST SIGNALS) */}
            <section className="values-section">
                <div className="container">
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-number">01</div>
                            <h4 className="value-title">Autenticidad</h4>
                            <p className="value-desc">Garantizamos que cada producto es legítimo. Doble verificación en mano antes de cada envío.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-number">02</div>
                            <h4 className="value-title">Curaduría</h4>
                            <p className="value-desc">No vendemos todo. Vendemos lo que usaríamos nosotros. Solo lo mejor de Jordan, Nike y Yeezy.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-number">03</div>
                            <h4 className="value-title">Cultura</h4>
                            <p className="value-desc">Respetamos la historia. Cada par viene con su contexto, no es solo moda, es legado.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM / SHOWROOM */}
            <section className="container" style={{ padding: '6rem 0' }}>
                <div className="showroom-banner" style={{ background: '#111', color: '#fff', padding: '4rem', textAlign: 'center' }}>
                    <h2>Visit Us</h2>
                    <p style={{ maxWidth: '600px', margin: '1rem auto', color: '#ccc' }}>
                        Aunque somos nativos digitales, realizamos pop-ups exclusivos en Santiago centro. Mantente atento a nuestras redes para el próximo evento.
                    </p>
                    <Link to="/contacto" className="btn btn-white">Contactar Equipo</Link>
                </div>
            </section>

            {/* TRUST MARK */}
            <div className="trust-block">
                <div className="trust-logo">
                    <img src="/assets/logo-isotype.png" alt="Lukstore Seal" />
                </div>
                <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, fontSize: '0.8rem' }}>
                    Santiago, Chile — Est. 2024
                </p>
            </div>
        </div>
    );
};

export default About;
