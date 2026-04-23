import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-premium">
            <div className="container">
                <div className="footer-top">
                    {/* Col 1: Brand */}
                    <div className="footer-col brand-col">
                        <img src="/assets/logo-web.png" alt="Lukstore Logo" className="footer-iso" style={{ height: '100px', width: 'auto', marginBottom: '1rem' }} />
                        <p className="footer-desc">
                            Selected street goods.
                            <br />Est. 2024 — Santiago, Chile.
                        </p>
                    </div>

                    {/* Col 2: Shop */}
                    <div className="footer-col">
                        <h5>Shop</h5>
                        <ul className="footer-links">
                            <li><Link to="/zapatillas">Zapatillas</Link></li>
                            <li><Link to="/hombre">Hombre</Link></li>
                            <li><Link to="/mujer">Mujer</Link></li>
                            <li><Link to="/accesorios">Accesorios</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Ayuda */}
                    <div className="footer-col">
                        <h5>Ayuda</h5>
                        <ul className="footer-links">
                            <li><Link to="/guia-tallas">Guía de tallas</Link></li>
                            <li><Link to="/envios">Envíos / Cambios</Link></li>
                            <li><Link to="/autenticidad">Autenticidad</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Contacto & Social */}
                    <div className="footer-col contact-col">
                        <h5>Contacto</h5>
                        <ul className="footer-contact-list">
                            <li>
                                <span className="icon">📍</span>
                                <span>Avenida La Dehesa, Santiago</span>
                            </li>
                            <li>
                                <span className="icon">📱</span>
                                <a href="https://wa.me/56933754698" target="_blank" rel="noopener noreferrer">+56 9 3375 4698</a>
                            </li>
                            <li>
                                <span className="icon">✉️</span>
                                <a href="mailto:hola@lukstore.cl">hola@lukstore.cl</a>
                            </li>
                        </ul>

                        <div className="social-links-new">
                            <a href="https://instagram.com/lukstore._" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://wa.me/56933754698" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        © {new Date().getFullYear()} Lukstore. Todos los derechos reservados.
                    </div>
                    <div className="legal-links">
                        <Link to="/terminos">Términos</Link>
                        <Link to="/privacidad">Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
