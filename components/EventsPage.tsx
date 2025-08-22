
import React from 'react';
import { MapPinIcon } from './icons/MapPinIcon';
import { TicketIcon } from './icons/TicketIcon';

interface Speaker {
  name: string;
  title: string;
  company: string;
  image: string;
}

interface ProgramDay {
  day: string;
  schedule: {
    time: string;
    topic: string;
    speaker?: string;
  }[];
}

interface Sponsor {
  name: string;
  logo: string;
}

export interface Event {
  id: number;
  type: 'Evento Principal' | 'Conferencia';
  country: string;
  city: string;
  month: string;
  day: number;
  title: string;
  description: string;
  venue: string;
  slotsAvailable: number;
  price: number;
  speakers: Speaker[];
  program: ProgramDay[];
  sponsors: {
    platinum: Sponsor[];
    gold: Sponsor[];
    silver: Sponsor[];
  };
  allies: Sponsor[];
  videos?: string[];
}

const groupEventsByMonth = (events: Event[]) => {
  return events.reduce((acc, event) => {
    const { month } = event;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {} as Record<string, Event[]>);
};

interface EventsPageProps {
  onSelectEvent: (event: Event) => void;
  events: Event[];
}

export const EventsPage: React.FC<EventsPageProps> = ({ onSelectEvent, events }) => {
  const groupedEvents = groupEventsByMonth(events);
  const months = ['Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'];

  return (
    <section id="events" className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary">
            Calendario de Eventos 2025
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Únete a nuestra gira por Latinoamérica. Eventos diseñados para inspirar, conectar y transformar la cultura de bienestar y creatividad en las empresas.
          </p>
        </div>

        <div className="space-y-12">
          {months.map(month => (
            groupedEvents[month] && (
              <div key={month}>
                <h2 className="text-2xl font-bold font-display text-brand-secondary mb-6 pb-2 border-b-2 border-brand-secondary/20">{month} 2025</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedEvents[month].sort((a,b) => a.day - b.day).map((event) => {
                    return (
                      <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                        <div className="p-6 flex-grow">
                           <p className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{event.type}</p>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-bold text-brand-secondary">{event.country}</p>
                              <h3 className="text-xl font-bold font-display text-brand-primary">{event.title}</h3>
                            </div>
                            <div className="text-center flex-shrink-0 ml-4 bg-brand-light p-3 rounded-lg">
                              <p className="text-brand-primary font-extrabold font-display text-2xl">{event.day}</p>
                              <p className="text-xs text-gray-500 uppercase tracking-wider">{event.month.substring(0,3)}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4 h-20 overflow-hidden text-sm leading-relaxed">{event.description}</p>
                          <div className="text-sm text-gray-500 space-y-2">
                            <div className="flex items-center">
                              <MapPinIcon className="w-4 h-4 mr-2 text-brand-secondary flex-shrink-0" />
                              <span>{event.city} - {event.venue}</span>
                            </div>
                            <div className="flex items-center">
                              <TicketIcon className="w-4 h-4 mr-2 text-brand-secondary flex-shrink-0" />
                              <span className={event.slotsAvailable < 50 ? 'font-bold text-amber-600' : ''}>
                                {event.slotsAvailable > 0 ? `${event.slotsAvailable} cupos disponibles` : 'Agotado'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4">
                          <button
                            onClick={() => onSelectEvent(event)}
                            className="w-full font-bold py-2 px-4 rounded-md transition-all duration-300 text-center bg-white ring-1 ring-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white"
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};
