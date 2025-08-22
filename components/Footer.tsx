
import React from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';

interface FooterProps {
  onSetView: (view: 'home' | 'ranking' | 'events' | 'terms' | 'privacy' | 'sello' | 'news') => void;
  onOpenContact: () => void;
  onOpenRegister: (type: 'person' | 'company') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSetView, onOpenContact, onOpenRegister }) => {
  const linkStyles = "text-gray-400 hover:text-white transition-colors cursor-pointer";

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 md:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <BrainCircuitIcon className="w-8 h-8 text-brand-secondary" />
              <span className="font-display font-bold text-xl">Por Definir</span>
            </div>
            <p className="text-gray-400 max-w-sm">Transformando el futuro del trabajo en Latinoamérica a través del bienestar y la innovación.</p>
          </div>

          <div>
            <h3 className="font-bold font-display tracking-wider text-gray-200 uppercase mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><button onClick={() => onSetView('sello')} className={linkStyles}>Sello TMCE</button></li>
              <li><button onClick={() => onSetView('events')} className={linkStyles}>Eventos</button></li>
              <li><button onClick={() => onSetView('ranking')} className={linkStyles}>Ranking</button></li>
              <li><button onClick={() => onSetView('news')} className={linkStyles}>Noticias</button></li>
              <li><button onClick={() => onOpenRegister('person')} className={linkStyles}>Únete</button></li>
              <li><button onClick={() => onOpenRegister('company')} className={linkStyles}>Une a tu empresa</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold font-display tracking-wider text-gray-200 uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><button onClick={onOpenContact} className={linkStyles}>Contacto</button></li>
              <li><button onClick={() => onSetView('terms')} className={linkStyles}>Términos y Condiciones</button></li>
              <li><button onClick={() => onSetView('privacy')} className={linkStyles}>Políticas de Privacidad</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
             <h3 className="font-bold font-display tracking-wider text-gray-200 uppercase mb-4">Síguenos</h3>
             <div className="flex space-x-4">
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="w-6 h-6" /></a>
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="w-6 h-6" /></a>
             </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ranking Salud Mental y Creatividad. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
