
import React, { useState, useRef, useEffect } from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { MenuIcon } from './icons/MenuIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { LoginIcon } from './icons/LoginIcon';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { User } from '../App';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { GiftIcon } from './icons/GiftIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';


type View = 'home' | 'ranking' | 'events' | 'sello' | 'myEvents' | 'benefits' | 'reports' | 'profile';

interface HeaderProps {
  user: User | null;
  setView: (view: View) => void;
  onLoginClick: () => void;
  onRegisterClick: (type?: 'person' | 'company') => void;
  onLogout: () => void;
}

const UserMenu: React.FC<{ user: User; setView: (view: View) => void; onLogout: () => void }> = ({ user, setView, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        { view: 'myEvents' as const, label: 'Mis Eventos', icon: <CalendarDaysIcon className="w-5 h-5"/> },
        { view: 'benefits' as const, label: 'Mis Beneficios', icon: <GiftIcon className="w-5 h-5"/> },
        { view: 'reports' as const, label: 'Reportes', icon: <ChartBarIcon className="w-5 h-5"/> },
        { view: 'profile' as const, label: 'Mi Perfil', icon: <UserCircleIcon className="w-5 h-5"/> },
    ];

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
                    {getInitials(user.name)}
                </div>
                <span className="hidden sm:inline font-semibold text-brand-dark">{user.name}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 overflow-hidden border">
                    <div className="p-4 border-b">
                        <p className="font-bold text-brand-dark truncate">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <nav className="py-2">
                        {menuItems.map(item => (
                            <button key={item.view} onClick={() => { setView(item.view); setIsOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                    <div className="p-2 border-t">
                        <button onClick={onLogout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors rounded-md">
                            <LogoutIcon className="w-5 h-5"/>
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export const Header: React.FC<HeaderProps> = ({ user, setView, onLoginClick, onRegisterClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'ranking' | 'events' | 'sello') => {
    setView(view);
    setIsMenuOpen(false);
  };
  
  const navLinks = [
    { view: 'ranking' as const, label: 'Ver Ranking' },
    { view: 'sello' as const, label: 'Nuestro Sello' },
    { view: 'events' as const, label: 'Eventos' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm relative">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
            <button onClick={() => handleNavClick('home')} className="flex items-center space-x-2" aria-label="Volver a la página principal">
                <BrainCircuitIcon className="w-8 h-8 text-brand-primary" />
                <span className="font-display font-bold text-xl text-brand-primary hidden sm:inline">Por Definir</span>
            </button>
        </div>
        
        {/* Centered Nav Links (Desktop) */}
        <nav className="hidden md:flex justify-center items-center space-x-2">
            {navLinks.map(link => (
                <button
                    key={link.view}
                    onClick={() => handleNavClick(link.view)}
                    className="text-brand-primary hover:text-brand-secondary font-bold py-2 px-4 rounded-full transition-colors duration-300 text-base"
                >
                    {link.label}
                </button>
            ))}
        </nav>

        {/* Auth Links + Mobile Nav */}
        <div className="flex justify-end items-center space-x-2">
            {user ? (
                <UserMenu user={user} setView={setView} onLogout={onLogout} />
            ) : (
                <>
                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-2">
                        <button
                            onClick={onLoginClick}
                            className="text-brand-primary font-bold py-2 px-4 rounded-full transition-colors duration-300 text-base"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => onRegisterClick()}
                            className="bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Registro
                        </button>
                    </div>

                    {/* Mobile Auth Buttons */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button onClick={onLoginClick} className="text-brand-primary p-2 rounded-full hover:bg-gray-100" aria-label="Iniciar sesión">
                            <LoginIcon className="w-6 h-6"/>
                        </button>
                        <button onClick={() => onRegisterClick()} className="bg-brand-secondary text-white p-2 rounded-full hover:bg-brand-primary shadow" aria-label="Registrarse">
                            <UserPlusIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="text-brand-primary p-2 rounded-full hover:bg-gray-100"
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 border-t border-gray-200">
            <nav className="flex flex-col py-2">
                {navLinks.map(link => (
                    <button
                        key={link.view}
                        onClick={() => handleNavClick(link.view)}
                        className="text-brand-primary hover:text-brand-secondary font-bold py-3 px-6 text-left hover:bg-gray-50 transition-colors duration-300 w-full"
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
        </div>
      )}
    </header>
  );
};
