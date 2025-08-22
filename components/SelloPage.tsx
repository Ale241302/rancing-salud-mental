
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SealIcon } from './icons/SealIcon';
import { UsersIcon } from './icons/UsersIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ArrowTrendingUpIcon } from './icons/ArrowTrendingUpIcon';
import { UpcomingEventsSection } from './UpcomingEventsSection';
import { NewsSection, NewsArticle } from './NewsSection';
import type { Event } from './EventsPage';

interface SelloPageProps {
  onBack: () => void;
  onRegisterClick: () => void;
  events: Event[];
  setView: (view: 'home' | 'ranking' | 'events' | 'sello' | 'news') => void;
  onSelectEvent: (event: Event) => void;
  news: NewsArticle[];
  onSelectNews: (article: NewsArticle) => void;
}

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center bg-brand-secondary/10 rounded-full w-14 h-14 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold font-display text-brand-primary mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const Step: React.FC<{ number: string; title: string; description: string; }> = ({ number, title, description }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border-2 border-brand-secondary rounded-full">
                    <span className="text-lg font-bold text-brand-secondary">{number}</span>
                </div>
            </div>
            <div className="w-px h-full bg-brand-secondary/30"></div>
        </div>
        <div className="pb-8">
            <h3 className="mb-2 text-xl font-bold text-brand-primary">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);


export const SelloPage: React.FC<SelloPageProps> = ({ onBack, onRegisterClick, events, setView, onSelectEvent, news, onSelectNews }) => {
  const certifiedCompanies = ['Mercado Libre', 'Globant', 'Rappi', 'Bancolombia', 'NotCo', 'Cornershop'];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-brand-light py-20 md:py-32">
         <div className="container mx-auto px-6">
            <div className="mb-8">
                <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Volver a Inicio
                </button>
            </div>
            <div className="text-center">
                <SealIcon className="w-24 h-24 mx-auto text-brand-accent mb-4"/>
                <h1 className="text-4xl md:text-6xl font-extrabold font-display text-brand-primary leading-tight mb-4">
                Sello Top Mental & Creative Employers
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-8">
                El reconocimiento que certifica a las empresas que invierten en su capital más importante: la salud y creatividad de su gente.
                </p>
                <button
                    onClick={onRegisterClick}
                    className="bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                Inicia el Proceso
                </button>
            </div>
         </div>
      </section>

      {/* Como Nace */}
      <section className="py-16 md:py-24">
         <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">¿Cómo Nace el Sello TMCE?</h2>
            <p className="mt-4 text-lg text-gray-600">
            Nace de una realidad innegable: el burnout, la rotación de talento y la falta de innovación cuestan millones. Las empresas necesitaban una forma de medir, comparar y mejorar el bienestar, no como un beneficio más, sino como un pilar estratégico del negocio. El Sello TMCE es nuestra respuesta: una metodología rigurosa para convertir la cultura en una ventaja competitiva visible y reconocida.
            </p>
         </div>
      </section>

      {/* Que Mide */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">¿Qué Mide Nuestro Sello?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Evaluamos 5 pilares fundamentales que definen a una organización saludable, resiliente e innovadora.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <InfoCard icon={<UsersIcon className="w-8 h-8 text-brand-secondary" />} title="Liderazgo y Cultura">
                    Analizamos cómo los líderes fomentan un ambiente de apoyo, comunicación transparente y propósito compartido.
                </InfoCard>
                <InfoCard icon={<ScaleIcon className="w-8 h-8 text-brand-secondary" />} title="Balance y Flexibilidad">
                    Medimos las políticas y prácticas que permiten a los colaboradores integrar su vida personal y profesional de forma saludable.
                </InfoCard>
                <InfoCard icon={<ShieldCheckIcon className="w-8 h-8 text-brand-secondary" />} title="Seguridad Psicológica">
                    Evaluamos el nivel de confianza y respeto, donde los equipos se sienten seguros para ser vulnerables, tomar riesgos y expresar ideas.
                </InfoCard>
                <InfoCard icon={<ArrowTrendingUpIcon className="w-8 h-8 text-brand-secondary" />} title="Desarrollo y Crecimiento">
                    Certificamos que la empresa invierte en el crecimiento profesional y personal de su gente, alineando metas individuales y corporativas.
                </InfoCard>
                <InfoCard icon={<SparklesIcon className="w-8 h-8 text-brand-secondary" />} title="Innovación y Creatividad">
                    Medimos las condiciones que permiten que la creatividad florezca, desde la autonomía y los recursos hasta la tolerancia al error.
                </InfoCard>
                 <div className="bg-brand-primary text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
                    <h3 className="text-2xl font-bold font-display">¿Listo para medir lo que importa?</h3>
                    <p className="mt-2 text-white/80">Obtén un diagnóstico claro y posiciona a tu empresa como líder.</p>
                    <button onClick={onRegisterClick} className="mt-4 bg-brand-accent hover:bg-amber-500 text-brand-dark font-bold py-2 px-6 rounded-full transition-colors">
                        Comenzar
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Como Conseguirlo */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">Un Proceso Claro y Transparente</h2>
                    <p className="mt-4 text-lg text-gray-600">Obtener el sello es un viaje de mejora continua. Te guiamos en cada paso.</p>
                </div>
                <div>
                    <Step number="1" title="Registro y Diagnóstico Inicial" description="Inscribe a tu empresa sin costo para acceder a nuestra evaluación inicial. Este primer paso nos permite entender tu punto de partida." />
                    <Step number="2" title="Encuestas a Colaboradores" description="Desplegamos encuestas anónimas y confidenciales basadas en nuestra metodología para obtener una visión 360° del sentir de tu equipo." />
                    <Step number="3" title="Análisis y Reporte de Resultados" description="Nuestro equipo de expertos analiza los datos y te entrega un reporte detallado con insights, benchmarks y áreas de oportunidad claras." />
                    <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border-2 border-brand-accent bg-brand-accent rounded-full">
                                    <span className="text-lg font-bold text-white">4</span>
                                </div>
                            </div>
                        </div>
                        <div className="pb-8">
                            <h3 className="mb-2 text-xl font-bold text-brand-primary">Certificación y Reconocimiento</h3>
                            <p className="text-gray-600">Las empresas que cumplen con los estándares reciben el Sello TMCE, acceso a nuestra comunidad de líderes y visibilidad en nuestros eventos y ranking anual.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Empresas con el sello */}
        <section className="py-16 md:py-24 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold font-display text-brand-primary">Empresas que Lideran el Cambio</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Compañías que ya han obtenido el Sello TMCE y son un referente en la región.</p>
                    <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                        {certifiedCompanies.map(name => (
                            <img key={name} src={`https://logo.clearbit.com/${name.toLowerCase().replace(/\s/g, '')}.com`} alt={name} className="h-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" onError={(e) => { e.currentTarget.style.display = 'none'; }}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Call to action final */}
        <section className="py-20 bg-brand-primary text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold font-display">Convierte tu Cultura en tu Mejor Estrategia</h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80">
                    Únete al movimiento de empresas que están redefiniendo el éxito. Mide, mejora y sé reconocido como un Top Mental & Creative Employer.
                </p>
                <div className="mt-8">
                    <button
                        onClick={onRegisterClick}
                        className="bg-brand-accent hover:bg-amber-500 text-brand-dark font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        Inicia el Proceso Ahora
                    </button>
                </div>
            </div>
        </section>

        <UpcomingEventsSection events={events} setView={setView} onSelectEvent={onSelectEvent} />
        <NewsSection news={news} setView={setView} onSelectNews={onSelectNews} />
    </div>
  );
};
