
import React from 'react';
import type { Event } from './EventsPage';
import type { NewsArticle } from './NewsSection';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { SearchIcon } from './icons/SearchIcon';

interface SearchResultsPageProps {
  query: string;
  allEvents: Event[];
  allNews: NewsArticle[];
  onSelectEvent: (event: Event) => void;
  onSelectNews: (article: NewsArticle) => void;
  onBack: () => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ query, allEvents, allNews, onSelectEvent, onSelectNews, onBack }) => {
    const lowerCaseQuery = query.toLowerCase();

    const filteredEvents = allEvents.filter(event => 
        event.title.toLowerCase().includes(lowerCaseQuery) ||
        event.description.toLowerCase().includes(lowerCaseQuery) ||
        event.country.toLowerCase().includes(lowerCaseQuery) ||
        event.city.toLowerCase().includes(lowerCaseQuery)
    );

    const filteredNews = allNews.filter(article => 
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        article.content.toLowerCase().includes(lowerCaseQuery)
    );

    const totalResults = filteredEvents.length + filteredNews.length;

    return (
        <section id="search-results" className="py-16 md:py-24 bg-brand-light min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Volver a Inicio
                    </button>
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">
                        Resultados de Búsqueda
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        {totalResults > 0 
                            ? `${totalResults} resultado(s) para ` 
                            : `No se encontraron resultados para `
                        }
                        <span className="font-bold text-brand-secondary">"{query}"</span>
                    </p>
                </div>

                {totalResults === 0 ? (
                    <div className="text-center bg-white p-12 rounded-lg shadow-md max-w-2xl mx-auto">
                        <SearchIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-2xl font-bold text-brand-primary">Sin resultados</h3>
                        <p className="mt-2 text-gray-600">Intenta con otras palabras clave o revisa la ortografía.</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {filteredEvents.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold font-display text-brand-secondary mb-6 pb-2 border-b-2 border-brand-secondary/20">
                                    Eventos Encontrados ({filteredEvents.length})
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredEvents.map(event => (
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
                                                <div className="text-sm text-gray-500 flex items-center mt-4">
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
                        )}

                        {filteredNews.length > 0 && (
                             <div>
                                <h2 className="text-2xl font-bold font-display text-brand-secondary mb-6 pb-2 border-b-2 border-brand-secondary/20">
                                    Noticias Encontradas ({filteredNews.length})
                                </h2>
                                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredNews.map(article => (
                                        <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                            <div className="relative">
                                                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover"/>
                                            </div>
                                            <div className="p-6 flex-grow flex flex-col">
                                                <p className="text-sm text-gray-500 mb-1">{article.source} &bull; {article.date}</p>
                                                <h3 className="text-lg font-bold font-display text-brand-primary leading-tight flex-grow mb-2">{article.title}</h3>
                                                <button onClick={() => onSelectNews(article)} className="mt-4 font-semibold text-brand-secondary self-start group-hover:underline text-left">
                                                    Leer más...
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
