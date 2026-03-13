import React from 'react';
import { motion } from 'framer-motion';
import { PageMeta } from '../../hooks/usePageMeta';
import { ShieldCheck, Search, ClipboardCheck, Award, Ruler, Box } from 'lucide-react';
import '../../pages/Institutional.css';

const Authenticity = () => {
    const steps = [
        {
            icon: <Search size={32} />,
            title: "Inspección Física",
            desc: "Revisamos costuras, materiales y pegamentos bajo luz ultravioleta para detectar cualquier anomalía."
        },
        {
            icon: <ClipboardCheck size={32} />,
            title: "Verificación de Tags",
            desc: "Cruzamos los códigos de etiquetas internas con bases de datos globales de la marca."
        },
        {
            icon: <Ruler size={32} />,
            title: "Análisis de Horma",
            desc: "Garantizamos que el peso y la estructura correspondan exactamente a los estándares del modelo."
        },
        {
            icon: <Box size={32} />,
            title: "Caja y Accesorios",
            desc: "Incluso el empaque debe ser perfecto. Verificamos fuentes, texturas y accesorios incluidos."
        }
    ];

    return (
        <div className="institutional-page authenticity-page">
            <PageMeta 
                title="Autenticidad Garantizada | Lukstore" 
                description="Conoce nuestro riguroso proceso de verificación. En Lukstore, la legitimidad no es opcional, es nuestra base." 
            />

            {/* HERO SECTION */}
            <header className="inst-hero" style={{ background: '#000', color: '#fff', padding: '8rem 0 4rem' }}>
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inst-tag" style={{ color: '#888', letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem' }}>Trust System</span>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, margin: '1rem 0', lineHeight: 1 }}>LEGIT OR NOTHING.</h1>
                        <p style={{ maxWidth: '600px', fontSize: '1.2rem', color: '#ccc' }}>
                            En un mercado saturado de réplicas, Lukstore nace para ofrecer paz mental. Cada par que vendemos ha pasado por un proceso de verificación manual de 12 puntos.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* CORE MESSAGE */}
            <section className="container" style={{ padding: '6rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Nuestro Compromiso</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#444', marginBottom: '1.5rem' }}>
                            La confianza es el activo más valioso en el streetwear. Por eso, no delegamos la autenticación. Todo el stock que ves en la web ha sido inspeccionado físicamente por nuestro equipo en Santiago.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#444' }}>
                            Si un producto no cumple con el 100% de nuestros estándares de legitimidad, simplemente no entra en nuestro catálogo. Sin excepciones.
                        </p>
                    </div>
                    <div style={{ background: '#f5f5f5', padding: '3rem', borderRadius: '24px', textAlign: 'center' }}>
                        <ShieldCheck size={80} strokeWidth={1} style={{ marginBottom: '1.5rem' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Sello Lukstore</h3>
                        <p style={{ color: '#666' }}>Garantía de originalidad de por vida en todos nuestros productos.</p>
                    </div>
                </div>
            </section>

            {/* STEPS GRID */}
            <section style={{ background: '#fafafa', padding: '6rem 0' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem' }}>Proceso de Verificación</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {steps.map((step, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                            >
                                <div style={{ marginBottom: '1.5rem', color: '#000' }}>{step.icon}</div>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{step.title}</h4>
                                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <Award size={48} style={{ marginBottom: '2rem' }} />
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>¿Tienes dudas adicionales?</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', color: '#666', fontSize: '1.1rem' }}>
                    Si quieres conocer más sobre un par específico o necesitas fotos de detalle adicionales, escríbenos. La transparencia es parte de nuestra curaduría.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="/contacto" className="btn btn-black" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Contactar Soporte</a>
                    <a href="/" className="btn btn-outline" style={{ padding: '1rem 2.5rem', borderRadius: '50px', border: '1px solid #000' }}>Ver Catálogo</a>
                </div>
            </section>
        </div>
    );
};

export default Authenticity;
