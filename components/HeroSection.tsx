
import React from 'react';

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-white py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-6 text-center relative">
        <h1 className="text-4xl md:text-6xl font-extrabold font-display text-brand-primary leading-tight mb-4">
          El Ranking que Mide lo que Realmente Importa:
          <br />
          <span className="text-brand-secondary">Salud Mental y Creatividad</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-8">
          Presentamos el primer ranking anual en Latinoamérica que convierte el bienestar en tu mayor ventaja competitiva. Sé un pionero, atrae al mejor talento y potencia tu marca empleadora.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRegisterClick}
            className="bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Únete al Ranking
          </button>
          <a
            href="#como-funciona"
            onClick={handleSmoothScroll}
            className="bg-white text-brand-secondary font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-brand-secondary"
          >
            Descubre Cómo
          </a>
        </div>
      </div>
    </section>
  );
};
