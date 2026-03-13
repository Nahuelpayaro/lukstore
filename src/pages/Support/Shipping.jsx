import React from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, ShieldCheck, Box } from 'lucide-react';
import '../../pages/Institutional.css';

const Shipping = () => {
    return (
        <div className="institutional-page shipping-page">
            <PageMeta title="Envíos y Entregas | Lukstore" description="Información detallada sobre nuestros tiempos de entrega y métodos de envío en todo Chile." />

            <header style={{ background: '#f5f5f5', padding: '6rem 0', textAlign: 'center' }}>
                <div className="container">
                    <Truck size={48} style={{ marginBottom: '1.5rem', color: '#000' }} />
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Envíos y Entregas</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto' }}>
                        Nos encargamos de que tu par llegue seguro y a tiempo a cualquier rincón de Chile.
                    </p>
                </div>
            </header>

            <section className="container" style={{ padding: '6rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    
                    {/* RM */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        style={{ background: '#fff', padding: '2.5rem', borderRadius: '20px', border: '1px solid #eee' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#000', color: '#fff', padding: '0.75rem', borderRadius: '12px' }}>
                                <MapPin size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Región Metropolitana</h3>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <Clock size={18} style={{ color: '#888', flexShrink: 0 }} />
                                <span><strong>Tiempo:</strong> 24 a 48 horas hábiles.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <Truck size={18} style={{ color: '#888', flexShrink: 0 }} />
                                <span><strong>Método:</strong> Delivery privado Lukstore.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <ShieldCheck size={18} style={{ color: '#888', flexShrink: 0 }} />
                                <span><strong>Seguridad:</strong> Entrega en mano con verificación.</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* REGIONES */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        style={{ background: '#fff', padding: '2.5rem', borderRadius: '20px', border: '1px solid #eee' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#000', color: '#fff', padding: '0.75rem', borderRadius: '12px' }}>
                                <Truck size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Otras Regiones</h3>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <Clock size={18} style={{ color: '#888', flexShrink: 0 }} />
                                <span><strong>Tiempo:</strong> 3 a 5 días hábiles.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <Box size={18} style={{ color: '#888', flexShrink: 0 }} />
                                <span><strong>Operadores:</strong> Blue Express / Starken.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <ShieldCheck size={18} style={{ color: '#888', flexShrink: 0 }} />
                                <span><strong>Seguimiento:</strong> Número de tracking enviado al mail.</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <div style={{ marginTop: '6rem', background: '#000', color: '#fff', padding: '4rem', borderRadius: '30px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Embalaje de Coleccionista</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto 2.5rem', color: '#999', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Sabemos que la caja es parte del valor. Todos nuestros envíos se realizan con **Double-Box** y protección de burbujas para asegurar que el producto llegue en condiciones Deadstock, tal como salió de la fábrica.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Caja Doble Reforzada</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Sellos de Seguridad</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Seguro de Transporte</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shipping;
