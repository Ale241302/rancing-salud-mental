
import React from 'react';
import type { NewsArticle } from './NewsSection';

interface NewsPageProps {
  news: NewsArticle[];
  onSelectNews: (article: NewsArticle) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ news, onSelectNews }) => {
  return (
    <section id="news-page" className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary">
            Noticias y Tendencias
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Mantente al día con las últimas novedades, análisis y tendencias sobre el bienestar corporativo, la salud mental y la innovación en Latinoamérica.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map(article => (
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
  );
};
