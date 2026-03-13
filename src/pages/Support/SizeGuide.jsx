import React, { useState } from 'react';
import { PageMeta } from '../../hooks/usePageMeta';
import { Ruler, Info, Info as InfoIcon } from 'lucide-react';
import '../../pages/Institutional.css';

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
        <div className="institutional-page size-guide-page">
            <PageMeta title="Guía de Tallas | Lukstore" description="Encuentra tu talla perfecta. Tablas comparativas para Nike, Jordan y Yeezy." />

            <header style={{ padding: '6rem 0 3rem', textAlign: 'center' }}>
                <div className="container">
                    <Ruler size={48} style={{ marginBottom: '1.5rem', color: '#000' }} />
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Guía de Tallas</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto' }}>
                        No dejes que una talla equivocada arruine el momento. Compara las medidas oficiales de las principales marcas.
                    </p>
                </div>
            </header>

            <section className="container" style={{ paddingBottom: '8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <button 
                        onClick={() => setActiveTab('nike')}
                        className={`btn ${activeTab === 'nike' ? 'btn-black' : 'btn-outline'}`}
                        style={{ padding: '0.8rem 2rem', borderRadius: '50px', border: activeTab === 'nike' ? 'none' : '1px solid #ddd' }}
                    >
                        Nike / Jordan
                    </button>
                    <button 
                        onClick={() => setActiveTab('yeezy')}
                        className={`btn ${activeTab === 'yeezy' ? 'btn-black' : 'btn-outline'}`}
                        style={{ padding: '0.8rem 2rem', borderRadius: '50px', border: activeTab === 'yeezy' ? 'none' : '1px solid #ddd' }}
                    >
                        Adidas / Yeezy
                    </button>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', borderRadius: '24px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead>
                            <tr style={{ background: '#f9f9f9' }}>
                                <th style={{ padding: '1.5rem', borderBottom: '2px solid #eee' }}>US</th>
                                <th style={{ padding: '1.5rem', borderBottom: '2px solid #eee' }}>UK</th>
                                <th style={{ padding: '1.5rem', borderBottom: '2px solid #eee' }}>EU</th>
                                <th style={{ padding: '1.5rem', borderBottom: '2px solid #eee' }}>CM / JP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(activeTab === 'nike' ? nikeSizes : yeezySizes).map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '1.2rem', fontWeight: 700 }}>{row.us}</td>
                                    <td style={{ padding: '1.2rem', color: '#666' }}>{row.uk}</td>
                                    <td style={{ padding: '1.2rem', color: '#666' }}>{row.eu}</td>
                                    <td style={{ padding: '1.2rem', fontWeight: 600 }}>{row.cm} cm</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ background: '#f5f5f5', padding: '2rem', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <InfoIcon size={20} />
                            <h4 style={{ fontWeight: 700 }}>Consejo Nike / Jordan</h4>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            La mayoría de los modelos Jordan (1, 3, 4) son **True To Size (TTS)**. Si tienes el pie ancho, especialmente en Jordan 4, recomendamos subir media talla (0.5 US).
                        </p>
                    </div>
                    <div style={{ background: '#f5f5f5', padding: '2rem', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <InfoIcon size={20} />
                            <h4 style={{ fontWeight: 700 }}>Consejo Yeezy</h4>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Las Yeezy 350 V2 tallan pequeño debido a su puntera ajustada. Recomendamos subir **siempre** media talla (0.5 US) de tu talla habitual en Nike.
                        </p>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>¿Aún no estás seguro?</h3>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Podemos asesorarte personalmente por WhatsApp para encontrar el fit perfecto según el modelo.</p>
                    <a href="https://wa.me/56900000000" className="btn btn-black" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Hablar con un Experto</a>
                </div>
            </section>
        </div>
    );
};

export default SizeGuide;
