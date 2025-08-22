
import React from 'react';
import type { Event } from './EventsPage';
import { MapPinIcon } from './icons/MapPinIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface UpcomingEventsSectionProps {
    events: Event[];
    setView: (view: 'home' | 'ranking' | 'events' | 'sello') => void;
    onSelectEvent: (event: Event) => void;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({ events, setView, onSelectEvent }) => {
    const upcomingEvents = events.slice(0, 3);

    return (
        <section id="proximos-eventos" className="py-16 md:py-24 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
                     <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">Próximos Eventos</h2>
                     <button onClick={() => setView('events')} className="flex items-center font-bold text-brand-secondary hover:text-brand-primary transition-colors self-start sm:self-center shrink-0">
                         Ver todos los eventos
                         <ArrowRightIcon className="w-5 h-5 ml-2" />
                     </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div className="p-6 flex-grow">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="text-center flex-shrink-0 mr-4 bg-brand-primary text-white p-3 rounded-lg">
                                        <p className="font-extrabold font-display text-2xl">{event.day}</p>
                                        <p className="text-xs uppercase tracking-wider">{event.month.substring(0,3)}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-secondary">{event.country}</p>
                                        <h3 className="text-xl font-bold font-display text-brand-primary leading-tight">{event.title}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-600 my-4 text-sm leading-relaxed">{event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description}</p>
                                <div className="text-sm text-gray-500 flex items-center">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-brand-secondary flex-shrink-0" />
                                    <span>{event.city}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 mt-auto">
                                <button onClick={() => onSelectEvent(event)} className="w-full font-bold py-2 px-4 rounded-md transition-all duration-300 text-center bg-white ring-1 ring-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white">
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
