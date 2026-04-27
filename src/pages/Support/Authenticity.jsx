import React from 'react';
import { motion } from 'framer-motion';
import { PageMeta } from '../../hooks/usePageMeta';
import { ShieldCheck, Search, ClipboardCheck, Award, Ruler, Box } from 'lucide-react';
import '../Support.css';

const Authenticity = () => {
    const steps = [
        { icon: <Search size={32} />, title: "Inspección Física", desc: "Revisamos costuras, materiales y pegamentos bajo luz ultravioleta para detectar cualquier anomalía." },
        { icon: <ClipboardCheck size={32} />, title: "Verificación de Tags", desc: "Cruzamos los códigos de etiquetas internas con bases de datos globales de la marca." },
        { icon: <Ruler size={32} />, title: "Análisis de Horma", desc: "Garantizamos que el peso y la estructura correspondan exactamente a los estándares del modelo." },
        { icon: <Box size={32} />, title: "Caja y Accesorios", desc: "Incluso el empaque debe ser perfecto. Verificamos fuentes, texturas y accesorios incluidos." }
    ];

    return (
        <div className="support-page">
            <PageMeta title="Autenticidad Garantizada | Lukstore" description="Conoce nuestro riguroso proceso de verificación. En Lukstore, la legitimidad no es opcional, es nuestra base." />

            <header className="support-hero support-hero-dark">
                <div className="container">
                    <span className="support-tag">Trust System</span>
                    <h1>LEGIT OR NOTHING.</h1>
                    <p>En un mercado saturado de réplicas, Lukstore nace para ofrecer paz mental. Cada par que vendemos ha pasado por un proceso de verificación manual de 12 puntos.</p>
                </div>
            </header>

            <section className="container support-body">
                <div className="support-two-col">
                    <div>
                        <h2 className="support-section-title">Nuestro Compromiso</h2>
                        <p className="support-text">La confianza es el activo más valioso en el streetwear. Por eso, no delegamos la autenticación. Todo el stock que ves en la web ha sido inspeccionado físicamente por nuestro equipo en Santiago.</p>
                        <p className="support-text">Si un producto no cumple con el 100% de nuestros estándares de legitimidad, simplemente no entra en nuestro catálogo. Sin excepciones.</p>
                    </div>
                    <div className="support-shield-card">
                        <ShieldCheck size={80} strokeWidth={1} />
                        <h3>Sello Lukstore</h3>
                        <p>Garantía de originalidad de por vida en todos nuestros productos.</p>
                    </div>
                </div>
            </section>

            <section className="support-steps-section">
                <div className="container">
                    <h2 className="support-section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Proceso de Verificación</h2>
                    <div className="support-steps-grid">
                        {steps.map((step, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="support-step-card">
                                <div className="support-step-icon">{step.icon}</div>
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container support-body" style={{ textAlign: 'center' }}>
                <Award size={48} style={{ marginBottom: '2rem', color: '#fff' }} />
                <h2 className="support-section-title">¿Tienes dudas adicionales?</h2>
                <p className="support-text" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>Si quieres conocer más sobre un par específico o necesitas fotos de detalle adicionales, escríbenos. La transparencia es parte de nuestra curaduría.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="/contacto" className="btn btn-white" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Contactar Soporte</a>
                    <a href="/" className="btn btn-outline" style={{ padding: '1rem 2.5rem', borderRadius: '50px', border: '1px solid #555' }}>Ver Catálogo</a>
                </div>
            </section>
        </div>
    );
};

export default Authenticity;
