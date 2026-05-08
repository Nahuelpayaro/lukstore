import React from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import '../Support.css';

const Privacy = () => {
    return (
        <div className="support-page">
            <PageMeta title="Política de Privacidad | Lukstore" description="Conocé cómo Lukstore recopila, usa y protege tu información personal." />

            <header className="support-hero">
                <div className="container">
                    <h1>Política de Privacidad</h1>
                    <p>Última actualización: Mayo 2025</p>
                </div>
            </header>

            <section className="container support-body">
                <div className="legal-content">
                    <p className="support-text">En Lukstore nos tomamos muy en serio la privacidad de nuestros clientes. Esta política describe qué información recopilamos, cómo la usamos y cómo la protegemos.</p>

                    <h2 className="support-section-title">1. Información que recopilamos</h2>
                    <p className="support-text">Cuando realizás una compra o te comunicás con nosotros, podemos recopilar los siguientes datos:</p>
                    <ul className="support-text" style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Nombre completo</li>
                        <li>Dirección de envío</li>
                        <li>Correo electrónico</li>
                        <li>Número de teléfono (para coordinar entregas)</li>
                    </ul>
                    <p className="support-text" style={{ marginTop: '0.75rem' }}>Los datos de pago son procesados directamente por plataformas de pago seguras (como Mercado Pago o Transbank). Lukstore <strong>nunca</strong> almacena información de tarjetas de crédito o débito en sus servidores.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">2. Uso de la información</h2>
                    <p className="support-text">Usamos tus datos exclusivamente para:</p>
                    <ul className="support-text" style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Procesar y coordinar tu pedido</li>
                        <li>Comunicarnos con vos ante cualquier consulta o novedad</li>
                        <li>Mejorar nuestros servicios y experiencia de compra</li>
                    </ul>
                    <p className="support-text" style={{ marginTop: '0.75rem' }}>No compartimos tu información personal con terceros con fines comerciales.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">3. Cookies</h2>
                    <p className="support-text">Utilizamos cookies para mejorar tu experiencia de navegación, recordar los artículos en tu carrito y analizar el tráfico de forma anónima. Podés desactivar las cookies desde la configuración de tu navegador, aunque algunas funciones del sitio podrían verse afectadas.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">4. Seguridad</h2>
                    <p className="support-text">Implementamos medidas de seguridad estándar de la industria para proteger tu información. Sin embargo, ningún sistema de transmisión de datos por internet es 100% seguro. Hacemos nuestro mejor esfuerzo para proteger tu información personal.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">5. Tus derechos</h2>
                    <p className="support-text">Tenés derecho a solicitar acceso, corrección o eliminación de tus datos personales en cualquier momento. Para hacerlo, contactanos a través de <a href="mailto:hola@lukstore.cl" style={{ color: 'inherit', textDecoration: 'underline' }}>hola@lukstore.cl</a>.</p>

                    <hr className="support-divider" />

                    <h2 className="support-section-title">6. Cambios a esta política</h2>
                    <p className="support-text">Podemos actualizar esta política en cualquier momento. Te notificaremos de cambios importantes a través de nuestros canales de comunicación habituales. El uso continuado del sitio implica la aceptación de la política vigente.</p>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
