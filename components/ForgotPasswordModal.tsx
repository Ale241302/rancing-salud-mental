
import React, { useState } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleClose = () => {
        setSubmitted(false);
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold font-display text-brand-primary">Recuperar Contraseña</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-700">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {submitted ? (
                    <div className="p-8 text-center">
                        <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-brand-primary">Correo Enviado</h3>
                        <p className="text-gray-600 mt-2">Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.</p>
                        <button
                            onClick={onSwitchToLogin}
                            className="mt-6 w-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                        >
                            Volver a Login
                        </button>
                    </div>
                ) : (
                    <div className="p-6">
                        <p className="text-center text-gray-600 mb-4">Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu cuenta.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                            <button
                                type="submit"
                                className="w-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                            >
                                Enviar Enlace de Recuperación
                            </button>
                        </form>
                         <p className="text-center text-sm text-gray-500 mt-4">
                            ¿Recordaste tu contraseña?{' '}
                            <button onClick={onSwitchToLogin} className="font-semibold text-brand-secondary hover:underline">
                                Inicia Sesión
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};