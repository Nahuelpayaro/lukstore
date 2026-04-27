import React, { useState } from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import { Ruler, Info } from 'lucide-react';
import '../Support.css';

const SizeGuide = () => {
    const [activeTab, setActiveTab] = useState('nike');

    const nikeSizes = [
        { us: '7', uk: '6', eu: '40', cm: '25' },
        { us: '7.5', uk: '6.5', eu: '40.5', cm: '25.5' },
        { us: '8', uk: '7', eu: '41', cm: '26' },
        { us: '8.5', uk: '7.5', eu: '42', cm: '26.5' },
        { us: '9', uk: '8', eu: '42.5', cm: '27' },
        { us: '9.5', uk: '8.5', eu: '43', cm: '27.5' },
        { us: '10', uk: '9', eu: '44', cm: '28' },
        { us: '10.5', uk: '9.5', eu: '44.5', cm: '28.5' },
        { us: '11', uk: '10', eu: '45', cm: '29' },
        { us: '12', uk: '11', eu: '46', cm: '30' },
    ];

    const yeezySizes = [
        { us: '7', uk: '6.5', eu: '40', cm: '25' },
        { us: '8', uk: '7.5', eu: '41 1/3', cm: '26' },
        { us: '9', uk: '8.5', eu: '42 2/3', cm: '27' },
        { us: '10', uk: '9.5', eu: '44', cm: '28' },
        { us: '11', uk: '10.5', eu: '45 1/3', cm: '29' },
    ];

    return (
        <div className="support-page">
            <PageMeta title="Guía de Tallas | Lukstore" description="Encuentra tu talla perfecta. Tablas comparativas para Nike, Jordan y Yeezy." />

            <header className="support-hero">
                <div className="container">
                    <Ruler size={48} className="support-hero-icon" />
                    <h1>Guía de Tallas</h1>
                    <p>No dejes que una talla equivocada arruine el momento. Compara las medidas oficiales de las principales marcas.</p>
                </div>
            </header>

            <section className="container support-body">
                <div className="size-tabs">
                    <button onClick={() => setActiveTab('nike')} className={`btn ${activeTab === 'nike' ? 'btn-white' : 'btn-outline-dark'}`}>
                        Nike / Jordan
                    </button>
                    <button onClick={() => setActiveTab('yeezy')} className={`btn ${activeTab === 'yeezy' ? 'btn-white' : 'btn-outline-dark'}`}>
                        Adidas / Yeezy
                    </button>
                </div>

                <div className="size-table-wrap">
                    <table className="size-table">
                        <thead>
                            <tr>
                                <th>US</th>
                                <th>UK</th>
                                <th>EU</th>
                                <th>CM / JP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(activeTab === 'nike' ? nikeSizes : yeezySizes).map((row, i) => (
                                <tr key={i}>
                                    <td className="size-us">{row.us}</td>
                                    <td>{row.uk}</td>
                                    <td>{row.eu}</td>
                                    <td className="size-cm">{row.cm} cm</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="support-cards-grid" style={{ marginTop: '4rem' }}>
                    <div className="support-card">
                        <div className="support-card-header">
                            <Info size={20} />
                            <h4>Consejo Nike / Jordan</h4>
                        </div>
                        <p className="support-text">La mayoría de los modelos Jordan (1, 3, 4) son True To Size (TTS). Si tenés el pie ancho, especialmente en Jordan 4, recomendamos subir media talla (0.5 US).</p>
                    </div>
                    <div className="support-card">
                        <div className="support-card-header">
                            <Info size={20} />
                            <h4>Consejo Yeezy</h4>
                        </div>
                        <p className="support-text">Las Yeezy 350 V2 tallan pequeño debido a su puntera ajustada. Recomendamos subir siempre media talla (0.5 US) de tu talla habitual en Nike.</p>
                    </div>
                </div>

                <div className="support-cta-block support-cta-center" style={{ marginTop: '6rem' }}>
                    <h3>¿Aún no estás seguro?</h3>
                    <p>Podemos asesorarte personalmente por WhatsApp para encontrar el fit perfecto según el modelo.</p>
                    <a href="https://wa.me/56900000000" className="btn btn-white" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Hablar con un Experto</a>
                </div>
            </section>
        </div>
    );
};

export default SizeGuide;
