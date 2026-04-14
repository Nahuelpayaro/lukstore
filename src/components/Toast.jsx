import React, { createContext, useContext, useState, useCallback } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import './Toast.css';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback(({ title, description, type = 'success', duration = 4000 }) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, title, description, type, duration }]);
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            <RadixToast.Provider swipeDirection="right">
                {children}
                {toasts.map(toast => (
                    <RadixToast.Root
                        key={toast.id}
                        className={`toast-root toast-${toast.type}`}
                        duration={toast.duration}
                        onOpenChange={(open) => { if (!open) removeToast(toast.id); }}
                        defaultOpen
                    >
                        <div className="toast-icon">
                            {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        </div>
                        <div className="toast-content">
                            {toast.title && (
                                <RadixToast.Title className="toast-title">{toast.title}</RadixToast.Title>
                            )}
                            {toast.description && (
                                <RadixToast.Description className="toast-description">{toast.description}</RadixToast.Description>
                            )}
                        </div>
                        <RadixToast.Close className="toast-close">
                            <X size={14} />
                        </RadixToast.Close>
                    </RadixToast.Root>
                ))}
                <RadixToast.Viewport className="toast-viewport" />
            </RadixToast.Provider>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
};
