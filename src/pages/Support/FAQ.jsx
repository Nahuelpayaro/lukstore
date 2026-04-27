import React, { useState } from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Package, Truck, CreditCard, RefreshCcw } from 'lucide-react';
import '../Support.css';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item">
            <button className="faq-trigger" onClick={() => setIsOpen(!isOpen)}>
                <span>{question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
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
                        <p className="faq-answer">{answer}</p>
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
        <div className="support-page">
            <PageMeta title="Preguntas Frecuentes | Lukstore" description="Resolvemos todas tus dudas sobre pedidos, envíos, autenticidad y más." />

            <header className="support-hero">
                <div className="container">
                    <HelpCircle size={48} className="support-hero-icon" />
                    <h1>¿Cómo podemos ayudarte?</h1>
                    <p>Encuentra respuestas rápidas a las dudas más comunes de nuestra comunidad.</p>
                </div>
            </header>

            <section className="container support-body">
                <div className="faq-wrapper">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="faq-group">
                            <div className="faq-group-header">
                                {cat.icon}
                                <h2>{cat.title}</h2>
                            </div>
                            {cat.items.map((item, i) => (
                                <FAQItem key={i} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="support-cta-block support-cta-center">
                    <h3>¿No encontraste tu respuesta?</h3>
                    <p>Nuestro equipo de soporte está disponible para ayudarte en tiempo real.</p>
                    <a href="https://wa.me/56900000000" className="btn btn-white" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Escribir al WhatsApp</a>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
