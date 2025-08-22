import React from 'react';
import { SealIcon } from './icons/SealIcon';

export const SolutionSection: React.FC = () => {
  return (
    <section id="solucion" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">Nace el Sello que te Diferencia</h2>
            <p className="mt-4 text-lg text-gray-600">
              Creamos el <span className="font-bold text-brand-secondary">Top Mental & Creative Health Employer</span>, un ecosistema que transforma el bienestar en un indicador de éxito medible y comparable.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Más que un ranking, es tu hoja de ruta hacia la excelencia organizacional. Un ecosistema único que mide y potencia los dos pilares que definirán a los líderes del futuro: la salud mental de tus equipos y su capacidad de innovar.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-8 rounded-2xl shadow-2xl text-white w-full max-w-md transform transition-transform duration-500 hover:scale-105">
              <div className="text-center">
                <SealIcon className="w-24 h-24 mx-auto text-brand-accent mb-4"/>
                <h3 className="text-2xl font-bold font-display">Top Employer</h3>
                <p className="text-sm font-semibold text-brand-accent tracking-widest">MENTAL & CREATIVE HEALTH</p>
                <div className="border-t border-white/20 my-4"></div>
                <p className="text-white/80">El reconocimiento para las empresas que lideran con empatía e impulsan la innovación.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};