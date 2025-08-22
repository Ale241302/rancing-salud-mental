
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { GiftIcon } from './icons/GiftIcon';

interface Benefit {
  allyName: string;
  allyLogo: string;
  title: string;
  description: string;
  code?: string;
}

const benefitsData: Benefit[] = [
  {
    allyName: 'WellAdvisor',
    allyLogo: 'https://welladvisor.co/wp-content/uploads/2025/06/logo-principal-1.png',
    title: '20% de Descuento en Planes Corporativos',
    description: 'Accede a un descuento exclusivo en todos nuestros planes de bienestar corporativo para potenciar la salud de tu equipo.',
    code: 'BIENESTAR20'
  },
  {
    allyName: 'Bibliomente',
    allyLogo: 'https://bibliomente.com/wp-content/uploads/2025/08/bibliomente_logo.png',
    title: 'Primer Mes Gratis en Suscripción Premium',
    description: 'Explora nuestra biblioteca digital de salud mental y creatividad con acceso ilimitado durante tu primer mes.',
  },
  {
    allyName: 'Salud Mental News',
    allyLogo: 'https://saludmental.news/wp-content/uploads/2025/07/alia4.png',
    title: 'Acceso Anticipado a Reportes',
    description: 'Recibe nuestros reportes de tendencias e industria 48 horas antes de su publicación general.',
  },
  {
    allyName: 'Psicologos Health',
    allyLogo: 'https://psicologos.health/wp-content/uploads/2025/06/cropped-logo-1.png',
    title: 'Primera Consulta de Terapia con 50% Off',
    description: 'Da el primer paso en tu camino de bienestar con un descuento especial en tu primera sesión de terapia online.',
    code: 'SALUD50'
  },
  {
    allyName: 'MentalPeer',
    allyLogo: 'https://storage.googleapis.com/welladvisor/logos/logo_01.jpeg',
    title: 'Taller de Primeros Auxilios Psicológicos',
    description: 'Inscribe a tu equipo en nuestro taller certificado con un 15% de descuento exclusivo para miembros de la comunidad.',
  },
  {
    allyName: 'PHia',
    allyLogo: 'https://storage.googleapis.com/welladvisor/logos/logo_02.jpeg',
    title: 'Diagnóstico de Clima Organizacional Gratuito',
    description: 'Utiliza nuestra IA para obtener un diagnóstico completo del clima y bienestar de tu organización sin costo.',
  },
];


export const BenefitsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <section id="benefits-page" className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="mb-8">
            <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Volver
            </button>
        </div>
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary">
              Mis Beneficios Exclusivos
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Disfruta de ofertas y descuentos especiales de nuestros aliados estratégicos, pensados para potenciar tu bienestar y el de tu empresa.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitsData.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                    <div className="p-6 border-b-4 border-brand-secondary">
                       <img src={benefit.allyLogo} alt={benefit.allyName} className="h-10 mb-4" onError={(e) => { e.currentTarget.src = `https://via.placeholder.com/150x40.png?text=${benefit.allyName.replace(/\s/g, '+')}` }}/>
                       <h2 className="text-xl font-bold font-display text-brand-primary leading-tight">{benefit.title}</h2>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <p className="text-gray-600 flex-grow">{benefit.description}</p>
                        {benefit.code ? (
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">Usa el código:</p>
                                <div className="mt-1 p-2 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md font-mono text-brand-primary font-bold tracking-widest">
                                    {benefit.code}
                                </div>
                            </div>
                        ) : (
                             <div className="mt-4 text-center">
                                 <button className="font-bold py-2 px-5 rounded-md transition-all duration-300 text-center bg-brand-secondary text-white hover:bg-brand-primary shadow-sm w-full">
                                     Obtener Beneficio
                                 </button>
                             </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
