
import React, { useState } from 'react';
import type { Event } from './EventsPage';
import type { User } from '../App';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { DigitalTicketModal } from './DigitalTicketModal';

interface MyEventsPageProps {
  user: User;
  registeredEvents: Event[];
  onBack: () => void;
}

export const MyEventsPage: React.FC<MyEventsPageProps> = ({ user, registeredEvents, onBack }) => {
  const [selectedEventForTicket, setSelectedEventForTicket] = useState<Event | null>(null);

  return (
    <>
      <section id="my-events" className="py-16 md:py-24 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Volver
            </button>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary">
              Mis Eventos Registrados
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Aquí encontrarás todos los eventos a los que te has inscrito. ¡Prepárate para una gran experiencia!
            </p>
          </div>
          
          {registeredEvents.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {registeredEvents.map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center transition-shadow hover:shadow-xl">
                  <div className="w-full md:w-1/3">
                    <img 
                      src={`https://picsum.photos/seed/${event.id}/400/300`} 
                      alt={event.title}
                      className="object-cover w-full h-48 md:h-full"
                    />
                  </div>
                  <div className="p-6 w-full md:w-2/3">
                    <p className="font-bold text-brand-secondary">{event.country}</p>
                    <h2 className="text-2xl font-bold font-display text-brand-primary">{event.title}</h2>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-x-4 gap-y-1">
                      <div className="flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-2" />{event.day} de {event.month}, 2025</div>
                      <div className="flex items-center"><MapPinIcon className="w-4 h-4 mr-2" />{event.city}</div>
                    </div>
                    <p className="text-gray-600 mt-3 text-sm">{event.description.substring(0, 120)}...</p>
                    <div className="mt-4">
                      <button 
                        onClick={() => setSelectedEventForTicket(event)}
                        className="font-bold py-2 px-5 rounded-md transition-all duration-300 text-center bg-brand-secondary text-white hover:bg-brand-primary shadow-sm"
                      >
                        Ver Entrada Digital
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-lg shadow-md max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-brand-primary">Aún no tienes eventos</h3>
              <p className="mt-2 text-gray-600">Explora nuestro calendario de eventos y únete a la próxima experiencia de bienestar y creatividad.</p>
              {/* Optional: Add a button to navigate to the events page */}
            </div>
          )}
        </div>
      </section>
      
      {selectedEventForTicket && (
        <DigitalTicketModal 
          isOpen={!!selectedEventForTicket}
          onClose={() => setSelectedEventForTicket(null)}
          event={selectedEventForTicket}
          user={user}
        />
      )}
    </>
  );
};
