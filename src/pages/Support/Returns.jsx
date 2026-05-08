import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../../hooks/usePageMeta';
import '../Support.css';

const Returns = () => {
    return (
        <div className="support-page">
            <PageMeta title="Política de Devoluciones | Lukstore" description="Información sobre la política de devoluciones de Lukstore." />

            <header className="support-hero">
                <div className="container">
                    <h1>Política de Devoluciones</h1>
                    <p>Última actualización: Mayo 2025</p>
                </div>
            </header>

            <section className="container support-body">
                <div className="legal-content">
                    <p className="support-text">En Lukstore trabajamos con productos de edición limitada y stock seleccionado. Por la naturaleza de nuestro negocio, es importante que leas con atención esta política antes de realizar tu compra.</p>

                    <h2 className="support-section-title">1. Política general</h2>
                    <p className="support-text"><strong>Lukstore no acepta devoluciones ni cambios</strong> una vez confirmada y despachada la compra. Todos nuestros productos pasan por un proceso de verificación de autenticidad y estado antes de ser enviados.</p>
                    <p className="support-text" style={{ marginTop: '0.75rem' }}>Te recomendamos revisar con cuidado la talla, el modelo y las fotos del producto antes de completar tu pedido. Si tenés dudas, nuestro equipo está disponible para ayudarte antes de la compra.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">2. Excepciones</h2>
                    <p className="support-text">La única excepción a esta política aplica cuando el producto recibido presenta un defecto de fábrica verificable o cuando existe un error de nuestra parte en el despacho (producto equivocado). En ese caso, debés contactarnos dentro de las <strong>48 horas</strong> siguientes a la recepción del pedido con:</p>
                    <ul className="support-text" style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Fotos claras del producto y el embalaje recibido</li>
                        <li>Número de orden</li>
                        <li>Descripción del problema</li>
                    </ul>
                    <p className="support-text" style={{ marginTop: '0.75rem' }}>Evaluaremos cada caso de forma individual y te daremos una respuesta dentro de las 24 horas hábiles siguientes.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">3. Cambios de talla</h2>
                    <p className="support-text">Dado que manejamos stock limitado, no podemos garantizar disponibilidad para cambios de talla. Por eso es fundamental que confirmes tu talla antes de comprar. Consultá nuestra <Link to="/guia-tallas" style={{ color: 'inherit', textDecoration: 'underline' }}>Guía de Tallas</Link> o escribinos antes de hacer tu pedido.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">4. Contacto</h2>
                    <p className="support-text">Para consultas previas a tu compra o para reportar un problema con tu pedido, podés contactarnos por:</p>
                    <ul className="support-text" style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>WhatsApp: <a href="https://wa.me/56933754698" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>+56 9 3375 4698</a></li>
                        <li>Email: <a href="mailto:hola@lukstore.cl" style={{ color: 'inherit', textDecoration: 'underline' }}>hola@lukstore.cl</a></li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Returns;
