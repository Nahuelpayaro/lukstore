import React from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import '../../pages/Institutional.css';

const Legal = () => {
    return (
        <div className="institutional-page legal-page">
            <PageMeta title="Términos y Privacidad | Lukstore" description="Información legal, términos de servicio y políticas de privacidad de Lukstore." />

            <header style={{ padding: '6rem 0 3rem', background: '#fafafa' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Legal</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Última actualización: Marzo 2024</p>
                </div>
            </header>

            <section className="container" style={{ padding: '6rem 0', display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', justifyContent: 'center' }}>
                <div className="legal-content" style={{ lineHeight: 1.8, color: '#333' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>1. Términos de Servicio</h2>
                    <p>
                        Bienvenido a Lukstore. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones. Nos reservamos el derecho de actualizar estos términos en cualquier momento sin previo aviso.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1rem' }}>1.1 Propiedad de los Productos</h3>
                    <p>
                        Lukstore comercializa productos de marcas internacionales. No somos distribuidores oficiales de las marcas mencionadas, sino un servicio de curaduría y reventa de artículos originales y verificados. Todas las marcas registradas son propiedad de sus respectivos dueños.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1rem' }}>1.2 Veracidad de la Información</h3>
                    <p>
                        Hacemos todo lo posible para mostrar los colores y detalles de nuestros productos con precisión. Sin embargo, no podemos garantizar que la visualización en tu monitor sea exacta. El stock es limitado y los precios pueden variar sin previo aviso.
                    </p>

                    <hr style={{ margin: '4rem 0', border: 'none', borderTop: '1px solid #eee' }} />

                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>2. Política de Privacidad</h2>
                    <p>
                        Tu privacidad es fundamental para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1rem' }}>2.1 Recopilación de Datos</h3>
                    <p>
                        Recopilamos información cuando realizas una compra, te registras en nuestro sitio o te suscribes a nuestro boletín. Esto incluye nombre, dirección de envío, correo electrónico y número de teléfono. Los datos de pago son procesados por pasarelas externas seguras y nunca se almacenan en nuestros servidores.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1rem' }}>2.2 Uso de Cookies</h3>
                    <p>
                        Utilizamos cookies para mejorar tu experiencia de navegación, recordar los artículos en tu carrito y analizar el tráfico del sitio para ofrecerte un mejor servicio. Puedes desactivar las cookies en la configuración de tu navegador.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1rem' }}>2.3 Seguridad de los Datos</h3>
                    <p>
                        Implementamos una variedad de medidas de seguridad para mantener la seguridad de tu información personal cuando realizas un pedido o ingresas, envías o accedes a tu información personal.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Legal;
