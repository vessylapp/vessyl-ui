"use client";

import {createContext, useContext, useMemo, useState} from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    function showToast({ message, tone = "success" }) {
        const id = crypto.randomUUID();
        setToasts((current) => [...current, { id, message, tone }]);

        window.setTimeout(() => {
            setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 2800);
    }

    const value = useMemo(() => ({ showToast }), []);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="toast-stack" aria-live="polite" aria-atomic="true">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast toast-${toast.tone}`}>
                        <span className="toast-icon" aria-hidden="true">✓</span>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }

    return context;
}
