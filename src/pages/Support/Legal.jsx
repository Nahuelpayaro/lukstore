import React from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import '../Support.css';

const Legal = () => {
    return (
        <div className="support-page">
            <PageMeta title="Términos y Privacidad | Lukstore" description="Información legal, términos de servicio y políticas de privacidad de Lukstore." />

            <header className="support-hero">
                <div className="container">
                    <h1>Legal</h1>
                    <p>Última actualización: Marzo 2024</p>
                </div>
            </header>

            <section className="container support-body">
                <div className="legal-content">
                    <h2 className="support-section-title">1. Términos de Servicio</h2>
                    <p className="support-text">Bienvenido a Lukstore. Al acceder y utilizar este sitio web, aceptás cumplir con los siguientes términos y condiciones. Nos reservamos el derecho de actualizar estos términos en cualquier momento sin previo aviso.</p>

                    <h3 className="support-subsection-title">1.1 Propiedad de los Productos</h3>
                    <p className="support-text">Lukstore comercializa productos de marcas internacionales. No somos distribuidores oficiales de las marcas mencionadas, sino un servicio de curaduría y reventa de artículos originales y verificados. Todas las marcas registradas son propiedad de sus respectivos dueños.</p>

                    <h3 className="support-subsection-title">1.2 Veracidad de la Información</h3>
                    <p className="support-text">Hacemos todo lo posible para mostrar los colores y detalles de nuestros productos con precisión. Sin embargo, no podemos garantizar que la visualización en tu monitor sea exacta. El stock es limitado y los precios pueden variar sin previo aviso.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">2. Política de Privacidad</h2>
                    <p className="support-text">Tu privacidad es fundamental para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.</p>

                    <h3 className="support-subsection-title">2.1 Recopilación de Datos</h3>
                    <p className="support-text">Recopilamos información cuando realizás una compra, te registrás en nuestro sitio o te suscribís a nuestro boletín. Esto incluye nombre, dirección de envío, correo electrónico y número de teléfono. Los datos de pago son procesados por pasarelas externas seguras y nunca se almacenan en nuestros servidores.</p>

                    <h3 className="support-subsection-title">2.2 Uso de Cookies</h3>
                    <p className="support-text">Utilizamos cookies para mejorar tu experiencia de navegación, recordar los artículos en tu carrito y analizar el tráfico del sitio para ofrecerte un mejor servicio. Podés desactivar las cookies en la configuración de tu navegador.</p>

                    <h3 className="support-subsection-title">2.3 Seguridad de los Datos</h3>
                    <p className="support-text">Implementamos una variedad de medidas de seguridad para mantener la seguridad de tu información personal cuando realizás un pedido o ingresás, enviás o accedés a tu información personal.</p>
                </div>
            </section>
        </div>
    );
};

export default Legal;
