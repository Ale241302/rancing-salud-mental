
import React from 'react';
import { BrainIcon } from './icons/BrainIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { UsersIcon } from './icons/UsersIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center bg-brand-secondary/10 rounded-full w-14 h-14 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold font-display text-brand-primary mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

export const ProblemSection: React.FC = () => {
  return (
    <section id="problema" className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">El Silencio que Cuesta Millones</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">La salud mental es el motor invisible de la innovación. Cuando se descuida, la creatividad se apaga y el talento se va.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={<BrainIcon className="w-8 h-8 text-brand-secondary" />} title="Estigma y Desconocimiento">
            La salud mental sigue siendo un tabú. Las empresas carecen de herramientas para medir su impacto real en el negocio.
          </FeatureCard>
          <FeatureCard icon={<LightbulbIcon className="w-8 h-8 text-brand-secondary" />} title="Fuga de Creatividad">
            El burnout y la ansiedad son los mayores enemigos de la innovación. Un equipo sin bienestar no puede crear el futuro.
          </FeatureCard>
          <FeatureCard icon={<UsersIcon className="w-8 h-8 text-brand-secondary" />} title="Talento Exigente">
            Los mejores profesionales ya no solo buscan un buen salario. Eligen empresas que invierten genuinamente en su bienestar integral.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};
