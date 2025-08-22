import React, { useState } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { MessageCircleIcon } from './icons/MessageCircleIcon';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
    };

    const handleClose = () => {
        setSubmitted(false); // Reset state on close
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold font-display text-brand-primary">Contáctanos</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-700">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {submitted ? (
                    <div className="p-8 text-center">
                        <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-brand-primary">¡Mensaje Enviado!</h3>
                        <p className="text-gray-600 mt-2">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                        <button
                            onClick={handleClose}
                            className="mt-6 bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2">
                        <div className="hidden md:flex flex-col items-center justify-center p-8 bg-brand-light rounded-l-lg">
                           <MessageCircleIcon className="w-24 h-24 text-brand-secondary mb-4"/>
                           <h3 className="text-2xl font-bold font-display text-brand-primary text-center">¿Tienes alguna duda?</h3>
                           <p className="text-gray-600 text-center mt-2">
                               Completa el formulario y nuestro equipo se pondrá en contacto contigo lo antes posible.
                           </p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                                    <input type="text" id="contact-name" required className="mt-1 w-full px-4 py-2 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="contact-email" required className="mt-1 w-full px-4 py-2 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                </div>
                                 <div>
                                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700">Asunto</label>
                                    <select id="contact-subject" required className="mt-1 w-full px-4 py-2 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary bg-white">
                                        <option>Consulta General</option>
                                        <option>Soporte Técnico</option>
                                        <option>Alianzas y Patrocinios</option>
                                        <option>Prensa</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                                    <textarea id="contact-message" rows={4} required className="mt-1 w-full px-4 py-2 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary"></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                                >
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
