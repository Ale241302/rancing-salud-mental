
import React from 'react';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ArrowTrendingUpIcon } from './icons/ArrowTrendingUpIcon';
import { TrophyIcon } from './icons/TrophyIcon';


interface StepCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, icon, title, description }) => (
  <div className="relative pl-12">
      <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-secondary text-white font-bold text-lg">
          {step}
      </div>
      <div className="ml-4">
          <div className="mb-2">{icon}</div>
          <h3 className="text-xl font-bold font-display text-brand-primary">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
      </div>
  </div>
);


export const HowItWorksSection: React.FC = () => {
    return (
        <section id="como-funciona" className="py-16 md:py-24 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">Un Ecosistema de Crecimiento Continuo</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Más que un ranking, un compañero de viaje para potenciar tu cultura organizacional.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="hidden md:block absolute left-5 top-5 bottom-5 w-0.5 bg-brand-secondary/20"></div>
                        <div className="space-y-12">
                            <StepCard
                                step={1}
                                icon={<ClipboardCheckIcon className="w-8 h-8 text-brand-secondary" />}
                                title="Diagnóstico Inicial Gratuito"
                                description="Participa sin costo y obtén una radiografía inicial del estado de salud mental y creatividad de tu organización con nuestra metodología validada."
                            />
                            <StepCard
                                step={2}
                                icon={<ChartBarIcon className="w-8 h-8 text-brand-secondary" />}
                                title="Análisis y Benchmarking"
                                description="Compara tus resultados con el mercado y descubre tus fortalezas y áreas de oportunidad. Accede a datos anónimos para una visión estratégica."
                            />
                            <StepCard
                                step={3}
                                icon={<ArrowTrendingUpIcon className="w-8 h-8 text-brand-secondary" />}
                                title="Consultoría y Soluciones (Upsell)"
                                description="Te ofrecemos acompañamiento y soluciones personalizadas para que puedas implementar mejoras efectivas y escalar posiciones en el ranking."
                            />
                            <StepCard
                                step={4}
                                icon={<TrophyIcon className="w-8 h-8 text-brand-secondary" />}
                                title="Reconocimiento y Sello Anual"
                                description="Las empresas mejor posicionadas reciben el sello Top Mental & Creative Health Employer en nuestro evento anual, un hito de prestigio en LATAM."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
