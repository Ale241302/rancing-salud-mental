
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
            <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver a Inicio
            </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary mb-6">Términos y Condiciones</h1>
        <div className="prose lg:prose-xl text-gray-700">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>
          <p>Bienvenido a Ranking Salud Mental y Creatividad. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web y servicios.</p>
          
          <h2 className="text-2xl font-bold font-display text-brand-primary mt-6">1. Aceptación de los Términos</h2>
          <p>Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Ranking Salud Mental y Creatividad si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.</p>
          
          <h2 className="text-2xl font-bold font-display text-brand-primary mt-6">2. Licencia</h2>
          <p>A menos que se indique lo contrario, Ranking Salud Mental y Creatividad y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en este sitio. Todos los derechos de propiedad intelectual están reservados. Puedes acceder a esto desde Ranking Salud Mental y Creatividad para tu propio uso personal sujeto a las restricciones establecidas en estos términos y condiciones.</p>
          
          <p>No debes:</p>
          <ul>
            <li>Volver a publicar material de Ranking Salud Mental y Creatividad</li>
            <li>Vender, alquilar o sublicenciar material de Ranking Salud Mental y Creatividad</li>
            <li>Reproducir, duplicar o copiar material de Ranking Salud Mental y Creatividad</li>
            <li>Redistribuir contenido de Ranking Salud Mental y Creatividad</li>
          </ul>

          <h2 className="text-2xl font-bold font-display text-brand-primary mt-6">3. Cuentas de Usuario</h2>
          <p>Cuando creas una cuenta con nosotros, debes proporcionarnos información precisa, completa y actualizada en todo momento. El incumplimiento de esto constituye una violación de los Términos, lo que puede resultar en la terminación inmediata de tu cuenta en nuestro servicio.</p>
          
          <h2 className="text-2xl font-bold font-display text-brand-primary mt-6">4. Terminación</h2>
          <p>Podemos terminar o suspender tu cuenta inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluido, entre otros, si incumples los Términos.</p>

        </div>
      </div>
    </section>
  );
};
