import React from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, ShieldCheck, Box } from 'lucide-react';
import '../Support.css';

const Shipping = () => {
    return (
        <div className="support-page">
            <PageMeta title="Envíos y Entregas | Lukstore" description="Información detallada sobre nuestros tiempos de entrega y métodos de envío en todo Chile." />

            <header className="support-hero">
                <div className="container">
                    <Truck size={48} className="support-hero-icon" />
                    <h1>Envíos y Entregas</h1>
                    <p>Nos encargamos de que tu par llegue seguro y a tiempo a cualquier rincón de Chile.</p>
                </div>
            </header>

            <section className="container support-body">
                <div className="support-cards-grid">
                    <motion.div whileHover={{ y: -5 }} className="support-card">
                        <div className="support-card-header">
                            <div className="support-icon-box"><MapPin size={24} /></div>
                            <h3>Región Metropolitana</h3>
                        </div>
                        <ul className="support-list">
                            <li><Clock size={18} /><span><strong>Tiempo:</strong> 24 a 48 horas hábiles.</span></li>
                            <li><Truck size={18} /><span><strong>Método:</strong> Delivery privado Lukstore.</span></li>
                            <li><ShieldCheck size={18} /><span><strong>Seguridad:</strong> Entrega en mano con verificación.</span></li>
                        </ul>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="support-card">
                        <div className="support-card-header">
                            <div className="support-icon-box"><Truck size={24} /></div>
                            <h3>Otras Regiones</h3>
                        </div>
                        <ul className="support-list">
                            <li><Clock size={18} /><span><strong>Tiempo:</strong> 3 a 5 días hábiles.</span></li>
                            <li><Box size={18} /><span><strong>Operadores:</strong> Blue Express / Starken.</span></li>
                            <li><ShieldCheck size={18} /><span><strong>Seguimiento:</strong> Número de tracking enviado al mail.</span></li>
                        </ul>
                    </motion.div>
                </div>

                <div className="support-cta-block">
                    <h2>Embalaje de Coleccionista</h2>
                    <p>
                        Sabemos que la caja es parte del valor. Todos nuestros envíos se realizan con Double-Box y protección de burbujas para asegurar que el producto llegue en condiciones Deadstock, tal como salió de la fábrica.
                    </p>
                    <div className="support-cta-badges">
                        <div className="support-badge"><ShieldCheck size={20} /><span>Caja Doble Reforzada</span></div>
                        <div className="support-badge"><ShieldCheck size={20} /><span>Sellos de Seguridad</span></div>
                        <div className="support-badge"><ShieldCheck size={20} /><span>Seguro de Transporte</span></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shipping;
