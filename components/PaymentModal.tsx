import React, { useState, useEffect } from 'react';
import type { Event } from './EventsPage';
import { XMarkIcon } from './icons/XMarkIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface RegistrationFormData {
    type: 'attendee' | 'company';
    price: number;
    name: string;
    email: string;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: () => void;
    event: Event;
    registrationData: RegistrationFormData;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess, event, registrationData }) => {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

    useEffect(() => {
        if (!isOpen) {
            setStatus('idle');
        }
    }, [isOpen]);

    const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('processing');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onPaymentSuccess();
            }, 1500);
        }, 2000);
    };

    if (!isOpen) return null;

    const ticketType = registrationData.type === 'attendee' ? 'Entrada Individual' : 'Paquete Corporativo';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold font-display text-brand-primary">Confirmar Pago</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {status === 'success' ? (
                    <div className="p-8 text-center">
                        <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-brand-primary">¡Pago Exitoso!</h3>
                        <p className="text-gray-600 mt-2">Redirigiendo a la confirmación...</p>
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="bg-brand-light/70 p-4 rounded-lg mb-6">
                            <h3 className="font-bold text-brand-primary">Resumen del Pedido</h3>
                            <div className="mt-2 text-sm space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Evento:</span>
                                    <span className="font-medium text-gray-800 text-right">{event.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tipo de Entrada:</span>
                                    <span className="font-medium text-gray-800">{ticketType}</span>
                                </div>
                                <div className="flex justify-between items-baseline mt-2 pt-2 border-t">
                                    <span className="font-bold text-brand-primary">Total:</span>
                                    <span className="font-extrabold text-xl text-brand-primary">${registrationData.price} USD</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handlePaymentSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
                                <div className="relative mt-1">
                                    <input type="text" id="cardNumber" name="cardNumber" required placeholder="0000 0000 0000 0000" className="w-full pl-4 pr-10 py-2 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <CreditCardIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Vencimiento</label>
                                    <input type="text" id="expiryDate" name="expiryDate" required placeholder="MM / AA" className="mt-1 w-full px-4 py-2 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                </div>
                                <div>
                                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                                    <input type="text" id="cvc" name="cvc" required placeholder="123" className="mt-1 w-full px-4 py-2 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Nombre en la Tarjeta</label>
                                <input type="text" id="cardName" name="cardName" required placeholder="Nombre Apellido" className="mt-1 w-full px-4 py-2 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'processing'}
                                className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center text-white shadow-md hover:shadow-lg flex items-center justify-center ${
                                    status === 'processing'
                                    ? 'bg-gray-400 cursor-wait'
                                    : 'bg-brand-secondary hover:bg-brand-primary'
                                }`}
                            >
                                {status === 'processing' && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {status === 'processing' ? 'Procesando...' : `Pagar $${registrationData.price} USD`}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
