
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
            <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver a Inicio
            </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary mb-6">Políticas de Privacidad</h1>
        <div className="prose lg:prose-xl text-gray-700">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>
          <p>Tu privacidad es importante para nosotros. Es política de Ranking Salud Mental y Creatividad respetar tu privacidad con respecto a cualquier información que podamos recopilar de ti a través de nuestro sitio web.</p>
          
          <h2 className="text-2xl font-bold font-display text-brand-primary mt-6">1. Información que Recopilamos</h2>
          <p>Solo pedimos información personal cuando realmente la necesitamos para brindarte un servicio. La recopilamos por medios justos y legales, con tu conocimiento y consentimiento. También te informamos por qué la estamos recopilando y cómo se utilizará.</p>
          
          <h2 className="text-2xl font-bold font-display text-brand-primary mt-6">2. Uso de la Información</h2>
          <p>Usamos la información recopilada para varios propósitos:</p>
          <ul>
            <li>Para proporcionar y mantener nuestro servicio</li>
            <li>Para notificarte sobre cambios en nuestro servicio</li>
            <li>Para permitirte participar en funciones interactivas de nuestro servicio cuando elijas hacerlo</li>
            <li>Para proporcionar atención al cliente</li>
            <li>Para recopilar análisis o información valiosa para que podamos mejorar nuestro servicio</li>
            <li>Para monitorear el uso de nuestro servicio</li>
            <li>Para detectar, prevenir y abordar problemas técnicos</li>
          </ul>

          <h2 className="text-2xl font-bold font-display text-brand-primary mt-6">3. Seguridad de los Datos</h2>
          <p>La seguridad de tus datos es importante para nosotros, pero recuerda que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger tus Datos personales, no podemos garantizar su seguridad absoluta.</p>
          
          <h2 className="text-2xl font-bold font-display text-brand-primary mt-6">4. Enlaces a Otros Sitios</h2>
          <p>Nuestro servicio puede contener enlaces a otros sitios que no son operados por nosotros. Si haces clic en un enlace de un tercero, serás dirigido al sitio de ese tercero. Te recomendamos encarecidamente que revises la Política de privacidad de cada sitio que visites. No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios o servicios de terceros.</p>

        </div>
      </div>
    </section>
  );
};
