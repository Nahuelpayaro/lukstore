import React, { useState } from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Package, Truck, CreditCard, RefreshCcw, ShieldCheck } from 'lucide-react';
import '../../pages/Institutional.css';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-accordion-item" style={{ borderBottom: '1px solid #eee' }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    width: '100%', 
                    padding: '1.5rem 0', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer'
                }}
            >
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ paddingBottom: '1.5rem', color: '#666', lineHeight: 1.6 }}>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const categories = [
        {
            icon: <Package size={24} />,
            title: "Pedidos y Productos",
            items: [
                { q: "¿Los productos son originales?", a: "Absolutamente. Todos nuestros pares pasan por un riguroso proceso de autenticación manual de 12 puntos antes de ser publicados." },
                { q: "¿Venden productos usados?", a: "Principalmente manejamos stock nuevo (Deadstock), pero contamos con una sección seleccionada de 'Used' con fotos reales y detalle de condición." },
                { q: "¿Puedo reservar un producto?", a: "Debido a la alta demanda y exclusividad de nuestros drops, no realizamos reservas sin el pago completo del producto." }
            ]
        },
        {
            icon: <Truck size={24} />,
            title: "Envíos y Entregas",
            items: [
                { q: "¿A qué regiones realizan envíos?", a: "Realizamos envíos a todo Chile a través de Blue Express y Starken con tarifa plana o por cobrar según la región." },
                { q: "¿Cuánto tarda en llegar mi pedido?", a: "En la Región Metropolitana entregamos en 24-48 horas hábiles. Para regiones, el tiempo estimado es de 3 a 5 días hábiles." },
                { q: "¿Puedo retirar mi compra?", a: "Sí, previa coordinación a través de nuestro WhatsApp oficial para retiros en nuestra oficina en Santiago." }
            ]
        },
        {
            icon: <CreditCard size={24} />,
            title: "Pagos y Seguridad",
            items: [
                { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas de débito, crédito (cuotas según tu banco) y transferencias bancarias directas." },
                { q: "¿Es seguro comprar en Lukstore?", a: "Nuestra web cuenta con certificados SSL y procesamos pagos a través de plataformas seguras. Además, puedes revisar las referencias de nuestra comunidad en Instagram." }
            ]
        },
        {
            icon: <RefreshCcw size={24} />,
            title: "Cambios y Devoluciones",
            items: [
                { q: "¿Aceptan cambios de talla?", a: "Sí, siempre y cuando tengamos stock disponible del mismo modelo. El producto debe estar en perfectas condiciones, sin uso y con sus etiquetas/caja original." },
                { q: "¿Qué pasa si mi pedido llega dañado?", a: "Contáctanos inmediatamente a nuestro WhatsApp de soporte con fotos del paquete. Nos haremos cargo de la gestión con la empresa de transporte." }
            ]
        }
    ];

    return (
        <div className="institutional-page faq-page">
            <PageMeta title="Preguntas Frecuentes | Lukstore" description="Resolvemos todas tus dudas sobre pedidos, envíos, autenticidad y más." />

            <header style={{ padding: '6rem 0 3rem', textAlign: 'center' }}>
                <div className="container">
                    <HelpCircle size={48} style={{ marginBottom: '1.5rem', color: '#000' }} />
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>¿Cómo podemos ayudarte?</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto' }}>
                        Encuentra respuestas rápidas a las dudas más comunes de nuestra comunidad.
                    </p>
                </div>
            </header>

            <section className="container" style={{ paddingBottom: '8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {categories.map((cat, idx) => (
                        <div key={idx} style={{ marginBottom: '4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
                                {cat.icon}
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat.title}</h2>
                            </div>
                            <div className="faq-group">
                                {cat.items.map((item, i) => (
                                    <FAQItem key={i} question={item.q} answer={item.a} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ background: '#f9f9f9', padding: '3rem', borderRadius: '24px', textAlign: 'center', marginTop: '4rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>¿No encontraste tu respuesta?</h3>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Nuestro equipo de soporte está disponible para ayudarte en tiempo real.</p>
                    <a href="https://wa.me/56900000000" className="btn btn-black" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Escribir al WhatsApp</a>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
