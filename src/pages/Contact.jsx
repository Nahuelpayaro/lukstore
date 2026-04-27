import React from 'react';
import { PageMeta } from '../hooks/usePageMeta';
import { Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { img } from '../data/siteConfig';
import './Contact.css';

const FORMSPREE_URL = 'https://formspree.io/f/xdaywolj';

const Contact = () => {
    const [status, setStatus] = React.useState('idle');

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
            if (res.ok) { setStatus('ok'); form.reset(); }
            else setStatus('error');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="contact-page">
            <PageMeta title="Contacto | Lukstore" description="Ponte en contacto con el equipo de Lukstore. Soporte ventas, autenticación y showroom." />

            <header className="contact-hero">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1>CONTACTO</h1>
                        <p>Estamos aquí para resolver tus dudas sobre lanzamientos, tallas o tu pedido actual.</p>
                    </motion.div>
                </div>
            </header>

            <section className="container contact-body">
                <div className="contact-grid">

                    {/* INFO */}
                    <div className="contact-info">
                        <h2>Canales Oficiales</h2>
                        <div className="contact-channels">
                            <div className="contact-channel">
                                <div className="contact-icon"><MessageCircle size={22} /></div>
                                <div>
                                    <h4>WhatsApp Soporte</h4>
                                    <p>Respuesta inmediata para ventas y guías.</p>
                                    <a href="https://wa.me/56933754698" className="contact-link">+56 9 3375 4698</a>
                                </div>
                            </div>
                            <div className="contact-channel">
                                <div className="contact-icon"><Mail size={22} /></div>
                                <div>
                                    <h4>Email Administrativo</h4>
                                    <p>Para temas de facturación y colaboraciones.</p>
                                    <a href="mailto:hola@lukstore.cl" className="contact-link">hola@lukstore.cl</a>
                                </div>
                            </div>
                            <div className="contact-channel">
                                <div className="contact-icon"><Clock size={22} /></div>
                                <div>
                                    <h4>Horarios</h4>
                                    <p>Lunes a Viernes: 10:00 - 19:00</p>
                                    <p>Sábados: 11:00 - 14:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="contact-form-card">
                        <h3>Envíanos un mensaje</h3>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label>NOMBRE COMPLETO</label>
                                <input name="nombre" type="text" required placeholder="Tu nombre..." />
                            </div>
                            <div className="form-group">
                                <label>EMAIL</label>
                                <input name="email" type="email" required placeholder="tu@email.com" />
                            </div>
                            <div className="form-group">
                                <label>MENSAJE</label>
                                <textarea name="mensaje" rows="4" required placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>
                            <button type="submit" disabled={status === 'sending'} className="btn btn-white contact-submit">
                                {status === 'sending' ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                            </button>
                            {status === 'ok' && <p className="form-success">¡Mensaje enviado! Te respondemos pronto.</p>}
                            {status === 'error' && <p className="form-error">Hubo un error. Intentá de nuevo.</p>}
                        </form>
                    </div>
                </div>
            </section>

            <section className="contact-showroom">
                <div className="container contact-showroom-grid">
                    <div className="contact-showroom-img">
                        <img src={img('contactShowroom')} alt="Showroom Lukstore" />
                    </div>
                    <div className="contact-showroom-text">
                        <span className="contact-tag">Showroom Santiago</span>
                        <h2>Visítanos</h2>
                        <p>Contamos con un espacio privado para pruebas de talla y visualización de stock exclusivo en la zona oriente de Santiago.</p>
                        <p><strong>Atención solo previa cita agendada por WhatsApp.</strong></p>
                        <div className="contact-location">
                            <MapPin size={18} />
                            <span>La Dehesa, Lo Barnechea, Santiago.</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
