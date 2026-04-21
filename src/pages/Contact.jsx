import React from 'react';
import { PageMeta } from '../hooks/usePageMeta';
import { Mail, MessageCircle, Clock, MapPin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import './Institutional.css';

const FORMSPREE_URL = 'https://formspree.io/f/xdaywolj';

const Contact = () => {
    const [status, setStatus] = React.useState('idle'); // idle | sending | ok | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        const form = e.target;
        const data = new FormData(form);

        try {
            const res = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });
            if (res.ok) {
                setStatus('ok');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="institutional-page contact-page">
            <PageMeta title="Contacto | Lukstore" description="Ponte en contacto con el equipo de Lukstore. Soporte ventas, autenticación y showroom." />

            <header style={{ padding: '8rem 0 4rem', textAlign: 'center', background: '#000', color: '#fff' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', color: 'rgba(255, 255, 255, 1)' }}>CONTACTO</h1>
                        <p style={{ color: '#888', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            Estamos aquí para resolver tus dudas sobre lanzamientos, tallas o tu pedido actual.
                        </p>
                    </motion.div>
                </div>
            </header>

            <section className="container" style={{ padding: '6rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                    
                    {/* INFO COL */}
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem' }}>Canales Oficiales</h2>
                        
                        <div style={{ display: 'grid', gap: '2.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '12px' }}>
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>WhatsApp Soporte</h4>
                                    <p style={{ color: '#666', marginBottom: '0.5rem' }}>Respuesta inmediata para ventas y guías.</p>
                                    <a href="https://wa.me/56933754698" style={{ fontWeight: 800, borderBottom: '2px solid #000', paddingBottom: '2px' }}>+56 9 3375 4698</a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '12px' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Email Administrativo</h4>
                                    <p style={{ color: '#666', marginBottom: '0.5rem' }}>Para temas de facturación y colaboraciones.</p>
                                    <a href="mailto:hola@lukstore.cl" style={{ fontWeight: 800, borderBottom: '2px solid #000', paddingBottom: '2px' }}>hola@lukstore.cl</a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '12px' }}>
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Horarios</h4>
                                    <p style={{ color: '#666' }}>Lunes a Viernes: 10:00 - 19:00</p>
                                    <p style={{ color: '#666' }}>Sábados: 11:00 - 14:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORM COL */}
                    <div style={{ background: '#fff', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Envíanos un mensaje</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#888' }}>NOMBRE COMPLETO</label>
                                <input name="nombre" type="text" required style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #eee', background: '#fafafa' }} placeholder="Tu nombre..." />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#888' }}>EMAIL</label>
                                <input name="email" type="email" required style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #eee', background: '#fafafa' }} placeholder="tu@email.com" />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#888' }}>MENSAJE</label>
                                <textarea name="mensaje" rows="4" required style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #eee', background: '#fafafa' }} placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>
                            <button type="submit" disabled={status === 'sending'} className="btn btn-black" style={{ marginTop: '1rem', padding: '1.2rem', borderRadius: '8px', fontWeight: 800, opacity: status === 'sending' ? 0.7 : 1 }}>
                                {status === 'sending' ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                            </button>
                            {status === 'ok' && <p style={{ color: 'green', fontWeight: 700, textAlign: 'center' }}>¡Mensaje enviado! Te respondemos pronto.</p>}
                            {status === 'error' && <p style={{ color: 'red', fontWeight: 700, textAlign: 'center' }}>Hubo un error. Intentá de nuevo.</p>}
                        </form>
                    </div>
                </div>
            </section>

            {/* LOCATION / SHOWROOM MOCKUP */}
            <section style={{ background: '#fafafa', padding: '8rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                        <img src="/assets/hero-street-editorial.png" alt="Showroom" style={{ width: '100%', display: 'block' }} />
                    </div>
                    <div>
                        <div style={{ background: '#000', color: '#fff', display: 'inline-flex', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.1em' }}>
                            SHOWROOM SANTIAGO
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Visítanos</h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.7, marginBottom: '2rem' }}>
                            Contamos con un espacio privado para pruebas de talla y visualización de stock exclusivo en la zona oriente de Santiago. 
                            <br /><br />
                            <strong>Atención solo previa cita agendada por WhatsApp.</strong>
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#000', fontWeight: 700 }}>
                            <MapPin size={20} />
                            <span>La Dehesa, Lo Barnechea, Santiago.</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
