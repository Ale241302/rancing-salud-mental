
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import { UserIcon } from './icons/UserIcon';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';
import { EyeIcon } from './icons/EyeIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';
import type { User } from '../App';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
    initialType?: 'person' | 'company';
    onRegistrationSuccess: (user: User) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSwitchToLogin, initialType = 'person', onRegistrationSuccess }) => {
    const [regType, setRegType] = useState<'person' | 'company'>(initialType);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setRegType(initialType);
            setShowPassword(false);
        }
    }, [isOpen, initialType]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        let user: User;

        if (regType === 'person') {
            user = {
                name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                email: formData.get('email') as string,
            };
        } else {
            user = {
                name: formData.get('contactName') as string,
                email: formData.get('contactEmail') as string,
                company: formData.get('companyName') as string,
            };
        }
        
        onRegistrationSuccess(user);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold font-display text-brand-primary">Crear una Cuenta</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-2 bg-gray-200 p-1 rounded-lg mb-6">
                        <button
                            onClick={() => setRegType('person')}
                            className={`py-2 px-4 rounded-md font-semibold transition-colors flex items-center justify-center gap-2 ${regType === 'person' ? 'bg-white text-brand-primary shadow' : 'text-gray-600'}`}
                        >
                            <UserIcon className="w-5 h-5" />
                            Persona
                        </button>
                        <button
                            onClick={() => setRegType('company')}
                            className={`py-2 px-4 rounded-md font-semibold transition-colors flex items-center justify-center gap-2 ${regType === 'company' ? 'bg-white text-brand-primary shadow' : 'text-gray-600'}`}
                        >
                            <BuildingOfficeIcon className="w-5 h-5" />
                            Empresa
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {regType === 'person' ? (
                            <>
                                <input name="firstName" type="text" placeholder="Nombre" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                <input name="lastName" type="text" placeholder="Apellido" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                <div className="relative">
                                    <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"><span className="sr-only">Toggle password visibility</span>{showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <input name="companyName" type="text" placeholder="Nombre de la Empresa" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                <input name="contactName" type="text" placeholder="Nombre de Contacto" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                <input name="contactEmail" type="email" placeholder="Email de Contacto" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                <div className="flex gap-2">
                                    <select required className="px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary bg-white">
                                        <option>NIT</option>
                                        <option>RUC</option>
                                        <option>CUIT</option>
                                        <option>Otro</option>
                                    </select>
                                    <input type="text" placeholder="Número" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                </div>
                                <div className="relative">
                                    <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"><span className="sr-only">Toggle password visibility</span>{showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}</button>
                                </div>
                            </>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                        >
                            Registrarse
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        ¿Ya tienes una cuenta?{' '}
                        <button onClick={onSwitchToLogin} className="font-semibold text-brand-secondary hover:underline">
                            Inicia Sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
