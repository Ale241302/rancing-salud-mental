
import React, { useState } from 'react';
import type { User } from '../App';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import { KeyIcon } from './icons/KeyIcon';

interface ProfilePageProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateUser(formData);
    setIsEditing(false);
    // Here you would typically show a success message
  };

  return (
    <section id="profile-page" className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Volver
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:flex md:items-center bg-brand-light border-b">
             <div className="w-24 h-24 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-4xl flex-shrink-0 mx-auto md:mx-0">
                {getInitials(user.name)}
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-extrabold font-display text-brand-primary">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-brand-primary mb-4 border-b pb-2">Información Personal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Nombre</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${!isEditing ? 'bg-gray-100 border-gray-200' : 'border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary'}`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} readOnly={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${!isEditing ? 'bg-gray-100 border-gray-200' : 'border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary'}`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Empresa (Opcional)</label>
                      <input type="text" name="company" value={formData.company || ''} onChange={handleChange} readOnly={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${!isEditing ? 'bg-gray-100 border-gray-200' : 'border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary'}`} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-brand-primary mb-4 border-b pb-2">Seguridad</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Nueva Contraseña</label>
                        <input type="password" placeholder="********" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Confirmar Contraseña</label>
                        <input type="password" placeholder="********" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                {isEditing ? (
                  <>
                    <button type="button" onClick={() => { setIsEditing(false); setFormData(user); }} className="px-5 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancelar</button>
                    <button type="submit" className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-secondary hover:bg-brand-primary">Guardar Cambios</button>
                  </>
                ) : (
                  <button type="button" onClick={() => setIsEditing(true)} className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-secondary hover:bg-brand-primary">Editar Perfil</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
