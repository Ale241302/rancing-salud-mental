
import React from 'react';
import type { Event } from './EventsPage';
import type { User } from '../App';
import { XMarkIcon } from './icons/XMarkIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface DigitalTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  user: User;
}

export const DigitalTicketModal: React.FC<DigitalTicketModalProps> = ({ isOpen, onClose, event, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold font-display text-brand-primary">Entrada Digital</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-brand-light p-6 rounded-lg text-center border-2 border-dashed border-gray-300">
            <div className="mx-auto w-40 h-40 p-2 bg-white rounded-lg shadow-inner">
              <QrCodeIcon className="w-full h-full text-brand-dark" />
            </div>
            <p className="mt-3 text-xs text-gray-500">Presenta este código QR en el acceso al evento.</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-2xl font-bold font-display text-brand-primary">{event.title}</h3>
            <div className="mt-3 text-sm space-y-2 text-gray-600">
              <div className="flex items-start">
                <CalendarDaysIcon className="w-5 h-5 mr-3 mt-0.5 text-brand-secondary flex-shrink-0" />
                <span>{event.day} de {event.month}, 2025</span>
              </div>
              <div className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-3 mt-0.5 text-brand-secondary flex-shrink-0" />
                <span>{event.venue}, {event.city}, {event.country}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <h4 className="font-bold text-brand-primary">Asistente</h4>
            <p className="text-gray-700">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-b-lg text-center">
            <button onClick={onClose} className="font-semibold py-2 px-5 rounded-md text-brand-primary hover:bg-gray-200 transition-colors">
                Cerrar
            </button>
        </div>
      </div>
    </div>
  );
};
