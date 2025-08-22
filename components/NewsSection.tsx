
import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

export interface NewsArticle {
    id: number;
    title: string;
    source: string;
    date: string;
    imageUrl: string;
    excerpt: string;
    link: string;
    content: string;
}

interface NewsSectionProps {
    news: NewsArticle[];
    setView: (view: 'news') => void;
    onSelectNews: (article: NewsArticle) => void;
}


export const NewsSection: React.FC<NewsSectionProps> = ({ news, setView, onSelectNews }) => {
    const featuredNews = news.slice(0, 3);
    
    return (
        <section id="noticias" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">Noticias y Tendencias</h2>
                    <button onClick={() => setView('news')} className="flex items-center font-bold text-brand-secondary hover:text-brand-primary transition-colors self-start sm:self-center shrink-0">
                        Ver todas las noticias
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredNews.map(article => (
                        <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div className="relative">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover"/>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <p className="text-sm text-gray-500 mb-1">{article.source} &bull; {article.date}</p>
                                <h3 className="text-lg font-bold font-display text-brand-primary leading-tight flex-grow mb-2">{article.title}</h3>
                                <p className="text-gray-600 mt-2 text-sm flex-grow">{article.excerpt}</p>
                                <button onClick={() => onSelectNews(article)} className="mt-4 font-semibold text-brand-secondary self-start group-hover:underline text-left">
                                    Leer más...
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};
