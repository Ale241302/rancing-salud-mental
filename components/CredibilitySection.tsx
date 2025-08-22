
import React from 'react';
import { AcademicCapIcon } from './icons/AcademicCapIcon';

export const CredibilitySection: React.FC = () => {
  return (
    <section id="credibilidad" className="py-16 md:py-24 bg-brand-primary text-white">
      <div className="container mx-auto px-6 text-center">
        <AcademicCapIcon className="w-16 h-16 mx-auto text-brand-accent mb-4" />
        <h2 className="text-3xl md:text-4xl font-extrabold font-display">Rigor Académico y Metodología Propia</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80">
          Nuestra metodología no es improvisada. Está desarrollada en colaboración con líderes académicos y expertos en psicología organizacional para garantizar resultados fiables, éticos y de alto impacto.
        </p>
        <div className="mt-8 flex justify-center items-center space-x-8 md:space-x-12">
          <div className="text-center">
            <p className="text-xl font-bold font-display">Universidad del Rosario</p>
            <p className="text-sm text-white/70">Aliado en Colombia</p>
          </div>
          <div className="border-l h-12 border-white/30"></div>
          <div className="text-center">
            <p className="text-xl font-bold font-display">Partner Académico</p>
            <p className="text-sm text-white/70">Aliado en Chile</p>
          </div>
        </div>
      </div>
    </section>
  );
};
