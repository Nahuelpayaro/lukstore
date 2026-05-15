import React, { useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { PageMeta } from '../hooks/usePageMeta';
import ProductCard from '../components/ProductCard';
import { Clock, Flame, Bell } from 'lucide-react';
import './Drops.css';

const Drops = () => {
    const { getActiveDrops, loading } = useProducts();
    // Force refresh of drops logic
    const drops = useMemo(() => getActiveDrops(), [getActiveDrops]);

    return (
        <div className="drops-page">
            <PageMeta title="LUKSTORE DROPS | Lanzamientos Exclusivos" description="Acceso a lanzamientos limitados. Jordan 4, Travis Scott, Off-White. Compra antes que se agoten." />

            {/* HERO SECTION */}
            <section className="drops-hero" style={{ backgroundImage: 'url(/assets/hero-drops-new.jpg)' }}>
                <div className="drops-overlay"></div>
                <div className="drops-hero-content">
                    <div className="drop-badge-hero">
                        <Flame size={16} />
                        <span>Hype Release Radar</span>
                    </div>
                    <h1 className="drops-title">Limited<br />Drops</h1>
                    <p className="drops-subtitle">
                        Acceso exclusivo a los pares más buscados. Stock limitado.
                        <br />Cuando se van, se van para siempre.
                    </p>
                </div>
            </section>

            {/* ACTIVE DROPS GRID */}
            <div className="container">
                <div className="drops-section-header">
                    <h2 className="drops-section-title">Disponibles Ahora</h2>
                    <span className="drops-counter">
                        {loading ? '...' : drops.length} ACTIVOS
                    </span>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Cargando lanzamientos...</div>
                ) : (
                    <div className="grid product-grid">
                        {drops.length > 0 ? (
                            drops.map((product) => (
                                <ProductCard key={product.id} {...product} isDrop={true} />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                                No hay drops activos en este momento.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* NEWSLETTER / ALERTS */}
            <section className="drops-newsletter">
                <div className="container">
                    <Bell size={48} style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
                    <h2 className="newsletter-title">Nunca pierdas un Drop</h2>
                    <p style={{ color: '#888', maxWidth: '400px', margin: '0 auto' }}>
                        Recibe notificaciones push y acceso anticipado 1 hora antes de cada lanzamiento oficial.
                    </p>

                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="newsletter-input"
                        />
                        <button className="newsletter-btn">
                            Unirse a la Lista
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Drops;
