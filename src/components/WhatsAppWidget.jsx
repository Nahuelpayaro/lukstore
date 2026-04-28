import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import './WhatsAppWidget.css';

const PHONE_NUMBER = "56948100032";

const QUICK_REPLIES = [
    { label: "Consultar por un pedido", text: "Hola Lukstore, necesito información sobre mi pedido." },
    { label: "Ayuda con tallas", text: "Hola, tengo dudas sobre qué talla elegir." },
    { label: "Ver disponibilidad de stock", text: "Hola, quiero saber si tienen stock de un producto." },
    { label: "Hablar con alguien", text: "Hola, quiero hablar con un asesor." }
];

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (text) => {
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="whatsapp-widget">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="wa-chat-window"
                    >
                        <div className="wa-header">
                            <div className="wa-header-info">
                                <span className="wa-avatar">LK</span>
                                <div>
                                    <h4>Lukstore Support</h4>
                                    <span className="wa-status">Responde en minutos</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="wa-close-btn">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="wa-body">
                            <div className="wa-message-received">
                                <p>¡Hola! 👋 Bienvenido a Lukstore. ¿En qué podemos ayudarte hoy?</p>
                                <span className="wa-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>

                            <div className="wa-options">
                                {QUICK_REPLIES.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(option.text)}
                                        className="wa-option-btn"
                                    >
                                        <span>{option.label}</span>
                                        <ChevronRight size={14} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`wa-float-btn ${isOpen ? 'active' : ''}`}
                aria-label="Abrir chat de WhatsApp"
            >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            </motion.button>
        </div>
    );
};

export default WhatsAppWidget;
