
import React, { useState } from 'react';
import type { Event } from './EventsPage';
import type { User } from '../App';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { TicketIcon } from './icons/TicketIcon';
import { PaymentModal } from './PaymentModal';
import { EyeIcon } from './icons/EyeIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';

interface EventDetailPageProps {
  event: Event;
  onBack: () => void;
  onRegisterSuccess: (user: User, event: Event) => void;
}

interface RegistrationFormData {
    type: 'attendee' | 'company';
    price: number;
    name: string;
    email: string;
    password?: string;
}

// Data for general strategic allies, same as in AlliesSection.tsx
const strategicAllies = [
  { name: 'WellAdvisor', logo: 'https://welladvisor.co/wp-content/uploads/2025/06/logo-principal-1.png' },
  { name: 'Bibliomente', logo: 'https://bibliomente.com/wp-content/uploads/2025/08/bibliomente_logo.png' },
  { name: 'Salud Mental News', logo: 'https://saludmental.news/wp-content/uploads/2025/07/alia4.png' },
  { name: 'Psicologos Health', logo: 'https://psicologos.health/wp-content/uploads/2025/06/cropped-logo-1.png' },
  { name: 'MentalPeer', logo: 'https://storage.googleapis.com/welladvisor/logos/logo_01.jpeg' },
  { name: 'PHia', logo: 'https://storage.googleapis.com/welladvisor/logos/logo_02.jpeg' },
];

const SponsorLogo: React.FC<{ sponsor: { name: string; logo: string } }> = ({ sponsor }) => (
  <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg h-24">
    <img src={sponsor.logo} alt={sponsor.name} className="max-h-16 max-w-full" onError={(e) => { e.currentTarget.src = `https://via.placeholder.com/150x60.png?text=${sponsor.name.replace(/\s/g, '+')}` }} />
  </div>
);

const RegistrationForm: React.FC<{ event: Event, onProceedToPayment: (data: RegistrationFormData) => void }> = ({ event, onProceedToPayment }) => {
  const [registrationType, setRegistrationType] = useState<'attendee' | 'company'>('attendee');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    
    const price = registrationType === 'attendee' ? event.price : parseFloat((event.price * 4.5).toFixed(0));
    const name = registrationType === 'attendee' 
      ? `${formData.get('firstName')} ${formData.get('lastName')}` 
      : formData.get('companyName') as string;
    const email = registrationType === 'attendee' 
      ? formData.get('attendeeEmail') as string 
      : formData.get('contactEmail') as string;
    
    onProceedToPayment({
        type: registrationType,
        price,
        name,
        email,
        password,
    });
  };
  
  return (
    <div className="bg-brand-light rounded-lg shadow-lg p-8 sticky top-28">
        <h3 className="text-2xl font-bold font-display text-brand-primary mb-4">Regístrate y Compra tu Entrada</h3>
        
        <div className="text-center mb-6 p-4 bg-white rounded-lg shadow-inner">
            <p className="text-sm text-gray-500">{registrationType === 'attendee' ? 'Entrada Individual' : 'Paquete Corporativo (5 personas)'}</p>
            <p className="text-3xl font-bold font-display text-brand-primary">
                ${registrationType === 'attendee' ? event.price : (event.price * 4.5).toFixed(0)} USD
            </p>
             {registrationType === 'company' && <p className="text-xs text-green-600 font-semibold">Ahorras un 10%</p>}
        </div>

        <div className="grid grid-cols-2 gap-2 bg-gray-200 p-1 rounded-lg mb-6">
            <button 
                onClick={() => setRegistrationType('attendee')}
                className={`py-2 px-4 rounded-md font-semibold transition-colors ${registrationType === 'attendee' ? 'bg-white text-brand-primary shadow' : 'text-gray-600'}`}
            >
                Persona
            </button>
            <button 
                onClick={() => setRegistrationType('company')}
                className={`py-2 px-4 rounded-md font-semibold transition-colors ${registrationType === 'company' ? 'bg-white text-brand-primary shadow' : 'text-gray-600'}`}
            >
                Empresa
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            {registrationType === 'attendee' ? (
                <>
                    <div className="flex gap-4">
                        <input name="firstName" type="text" placeholder="Nombre" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                        <input name="lastName" type="text" placeholder="Apellido" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                    </div>
                    <input name="attendeeEmail" type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                    <div className="relative">
                        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"><span className="sr-only">Toggle password visibility</span>{showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}</button>
                    </div>
                    <input name="confirmPassword" type="password" placeholder="Confirmar Contraseña" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                </>
            ) : (
                <>
                    <input name="companyName" type="text" placeholder="Nombre de la Empresa" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                    <input name="contactName" type="text" placeholder="Nombre de Contacto" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                    <input name="contactEmail" type="email" placeholder="Email de Contacto" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                     <div className="flex gap-2">
                        <select required className="px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary bg-white">
                            <option>NIT</option>
                            <option>RUC</option>
                            <option>CUIT</option>
                            <option>Otro</option>
                        </select>
                        <input type="text" placeholder="Número" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                    </div>
                    <div className="relative">
                        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"><span className="sr-only">Toggle password visibility</span>{showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}</button>
                    </div>
                    <input name="confirmPassword" type="password" placeholder="Confirmar Contraseña" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
                    <input name="attendeeCount" type="number" value="5" readOnly placeholder="Número de Asistentes" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary bg-gray-100" />
                </>
            )}
             <div className="flex items-center font-semibold pt-2">
                <TicketIcon className="w-5 h-5 mr-2 text-brand-secondary"/>
                <span className={event.slotsAvailable < 50 ? 'text-amber-600' : 'text-brand-primary'}>
                    {event.slotsAvailable > 0 ? `${event.slotsAvailable} cupos disponibles` : 'Agotado'}
                </span>
            </div>
            <button
                type="submit"
                disabled={event.slotsAvailable === 0}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center text-white shadow-md hover:shadow-lg ${
                    event.slotsAvailable === 0 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-brand-secondary hover:bg-brand-primary'
                }`}
            >
                {event.slotsAvailable === 0 ? 'Agotado' : 'Registrarse y Pagar'}
            </button>
        </form>
    </div>
  );
};


export const EventDetailPage: React.FC<EventDetailPageProps> = ({ event, onBack, onRegisterSuccess }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(event.videos && event.videos.length > 0 ? event.videos[0] : null);

  // Combine event-specific allies with general strategic allies, avoiding duplicates.
  const allAllies = [...event.allies];
  const eventAllyNames = new Set(event.allies.map(ally => ally.name));
  strategicAllies.forEach(ally => {
    if (!eventAllyNames.has(ally.name)) {
      allAllies.push(ally);
    }
  });

  const handleProceedToPayment = (data: RegistrationFormData) => {
    setRegistrationData(data);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    if(registrationData){
        const user: User = {
            name: registrationData.name,
            email: registrationData.email,
            company: registrationData.type === 'company' ? registrationData.name : undefined
        };
        onRegisterSuccess(user, event);
    }
  };
  
  const hasContent = (tabId: string) => {
    switch (tabId) {
        case 'program': return event.program && event.program.length > 0;
        case 'speakers': return event.speakers && event.speakers.length > 0;
        case 'sponsors': return (event.sponsors && (event.sponsors.platinum.length > 0 || event.sponsors.gold.length > 0 || event.sponsors.silver.length > 0)) || (allAllies && allAllies.length > 0);
        default: return false;
    }
  };

  return (
    <>
      <section id="event-detail" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-8">
              <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Volver al Calendario
              </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {currentVideoId ? (
                    <div className="mb-8">
                        <div className="aspect-video bg-black rounded-lg mb-4 shadow-lg overflow-hidden">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        {event.videos && event.videos.length > 1 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                {event.videos.map((videoId) => (
                                    <button 
                                        key={videoId} 
                                        onClick={() => setCurrentVideoId(videoId)}
                                        className={`group relative aspect-video rounded-md overflow-hidden transition-all duration-200 focus:outline-none ${videoId === currentVideoId ? 'ring-4 ring-brand-secondary' : 'hover:scale-105 focus:ring-4 focus:ring-brand-secondary/50'}`}
                                        aria-label={`Play video ${videoId}`}
                                    >
                                        <img 
                                            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                                            alt="Video thumbnail" 
                                            className="w-full h-full object-cover"
                                        />
                                        {videoId !== currentVideoId && <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="aspect-video bg-gray-200 rounded-lg mb-8 shadow-lg overflow-hidden flex items-center justify-center">
                        <img 
                            src={`https://picsum.photos/seed/${event.id}/800/450`} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <header className="mb-12">
                  <p className="font-bold text-brand-secondary">{event.country}</p>
                  <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary">{event.title}</h1>
                  <div className="flex flex-wrap items-center text-md text-gray-500 mt-3 gap-x-6 gap-y-2">
                    <div className="flex items-center"><CalendarDaysIcon className="w-5 h-5 mr-2 text-brand-secondary" />{event.day} de {event.month}, 2025</div>
                    <div className="flex items-center"><MapPinIcon className="w-5 h-5 mr-2 text-brand-secondary" />{event.venue}, {event.city}</div>
                  </div>
                </header>

                  <h2 className="text-2xl font-bold font-display text-brand-primary mb-4">Acerca del Evento</h2>
                  <p className="text-xl text-gray-700 mb-12 leading-relaxed">{event.description}</p>
                  
                  {hasContent('program') && (
                      <div className="mb-12">
                          <h3 className="text-3xl font-bold font-display text-brand-primary mb-6 pb-3 border-b-2 border-brand-secondary/30">Programa</h3>
                          <div className="space-y-6">
                              {event.program.map(day => (
                                  <div key={day.day}>
                                      <h4 className="font-bold text-xl text-brand-primary mb-3">{day.day}</h4>
                                      <ul className="border-l-2 border-brand-secondary/20 pl-6 space-y-4">
                                          {day.schedule.map(item => (
                                              <li key={item.time} className="relative">
                                                  <div className="absolute -left-[34px] top-1.5 w-4 h-4 bg-brand-secondary rounded-full border-4 border-white"></div>
                                                  <p className="text-brand-secondary font-semibold">{item.time}</p>
                                                  <p className="font-medium text-gray-800">{item.topic}</p>
                                                  {item.speaker && <p className="text-sm text-gray-500">con {item.speaker}</p>}
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
                  
                  {hasContent('speakers') && (
                      <div className="mb-12">
                          <h3 className="text-3xl font-bold font-display text-brand-primary mb-6 pb-3 border-b-2 border-brand-secondary/30">Ponentes</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {event.speakers.map(speaker => (
                                  <div key={speaker.name} className="text-center">
                                      <img src={speaker.image} alt={speaker.name} className="w-32 h-32 rounded-full mx-auto mb-3 object-cover ring-4 ring-brand-light" />
                                      <h4 className="font-bold text-lg text-brand-primary">{speaker.name}</h4>
                                      <p className="text-sm text-brand-secondary font-medium">{speaker.title}</p>
                                      <p className="text-sm text-gray-500">{speaker.company}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
                  
                  {hasContent('sponsors') && (
                      <div>
                          <h3 className="text-3xl font-bold font-display text-brand-primary mb-6 pb-3 border-b-2 border-brand-secondary/30">Patrocinadores y Aliados</h3>
                          <div className="space-y-8">
                              {event.sponsors.platinum.length > 0 && <div>
                                  <h4 className="font-bold text-xl text-brand-accent mb-3">Platinum</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                      {event.sponsors.platinum.map(s => <SponsorLogo key={s.name} sponsor={s} />)}
                                  </div>
                              </div>}
                              {event.sponsors.gold.length > 0 && <div>
                                  <h4 className="font-bold text-xl text-slate-500 mb-3">Gold</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      {event.sponsors.gold.map(s => <SponsorLogo key={s.name} sponsor={s} />)}
                                  </div>
                              </div>}
                              {event.sponsors.silver.length > 0 && <div>
                                  <h4 className="font-bold text-xl text-orange-600 mb-3">Silver</h4>
                                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                      {event.sponsors.silver.map(s => <SponsorLogo key={s.name} sponsor={s} />)}
                                  </div>
                              </div>}
                              {allAllies.length > 0 && <div>
                                  <h4 className="font-bold text-xl text-brand-primary mb-3">Aliados Estratégicos</h4>
                                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                      {allAllies.map(s => <SponsorLogo key={s.name} sponsor={s} />)}
                                  </div>
                              </div>}
                          </div>
                      </div>
                  )}
              </div>
              <div className="lg:col-span-1">
                  <RegistrationForm 
                    event={event} 
                    onProceedToPayment={handleProceedToPayment} 
                  />
              </div>
          </div>
        </div>
      </section>
      {isPaymentModalOpen && registrationData && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
          event={event}
          registrationData={registrationData}
        />
      )}
    </>
  );
};
