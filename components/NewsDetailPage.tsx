
import React from 'react';
import type { NewsArticle } from './NewsSection';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface NewsDetailPageProps {
  article: NewsArticle;
  onBack: () => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ article, onBack }) => {
  return (
    <section id="news-detail-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Volver a Noticias
          </button>
        </div>

        <article>
          <header className="mb-8">
            <p className="text-brand-secondary font-semibold">{article.source} &bull; {article.date}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary mt-2">{article.title}</h1>
          </header>

          <img src={article.imageUrl} alt={article.title} className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8" />
          
          <div 
            className="prose lg:prose-xl max-w-full text-gray-700" 
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </section>
  );
};
