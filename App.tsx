// App.tsx
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { BenefitsSection } from './components/BenefitsSection';
import { CredibilitySection } from './components/CredibilitySection';
import { AlliesSection } from './components/AlliesSection';
import { Footer } from './components/Footer';
import { RankingPage } from './components/RankingPage';
import { EventsPage, Event } from './components/EventsPage';
import { EventDetailPage } from './components/EventDetailPage';
import { RegistrationModal } from './components/RegistrationModal';
import { LoginModal } from './components/LoginModal';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ContactModal } from './components/ContactModal';
import { SelloPage } from './components/SelloPage';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';
import { NewsSection, NewsArticle } from './components/NewsSection';
import { NewsPage } from './components/NewsPage';
import { NewsDetailPage } from './components/NewsDetailPage';
import { MyEventsPage } from './components/MyEventsPage';
import { BenefitsPage } from './components/BenefitsPage';
import { ReportsPage } from './components/ReportsPage';
import { ProfilePage } from './components/ProfilePage';

// ✅ IMPORTS CORREGIDOS PARA SESIÓN
import { profile as apiProfile, logout as apiLogout } from './services/auth';
import { getToken, clearToken } from './services/session';

export interface User {
  name: string;
  email: string;
  company?: string;
}

const eventsData: Event[] = [
  { 
    id: 1, type: 'Evento Principal', country: 'Colombia', city: 'Bogotá', month: 'Febrero', day: 15, title: 'Cumbre de Bienestar Corporativo', description: 'El evento líder en Colombia para discutir el futuro del bienestar en el trabajo. Tres días de inmersión total con los principales expertos en salud mental, creatividad y cultura organizacional. Aprende estrategias prácticas, conecta con líderes de la región y transforma tu empresa.', venue: 'Centro de Convenciones Corferias', slotsAvailable: 42, price: 250,
    videos: ['z1z_S3_T-wE', 'l_3-2zU7-aQ'],
    speakers: [
      { name: 'Dr. Ana María Rojas', title: 'CEO, Bienestar Hoy', company: 'Bienestar Hoy', image: 'https://i.pravatar.cc/150?u=speaker1' },
      { name: 'Carlos Valderrama', title: 'Director de Innovación', company: 'MenteSana Corp', image: 'https://i.pravatar.cc/150?u=speaker2' },
      { name: 'Sofía Vergara', title: 'Experta en Psicología Organizacional', company: 'Universidad de los Andes', image: 'https://i.pravatar.cc/150?u=speaker3' },
    ],
    program: [
      { day: 'Día 1: Fundamentos', schedule: [ { time: '09:00', topic: 'Bienvenida y Apertura', speaker: 'Dr. Ana María Rojas' }, { time: '10:00', topic: 'El ROI del Bienestar', speaker: 'Carlos Valderrama' }, { time: '12:00', topic: 'Panel: Cultura y Salud Mental', speaker: 'Todos' }] },
      { day: 'Día 2: Estrategias', schedule: [ { time: '09:30', topic: 'Mindfulness en la Oficina', speaker: 'Sofía Vergara' }, { time: '11:00', topic: 'Taller: Liderazgo Empático', speaker: 'Carlos Valderrama' }] },
      { day: 'Día 3: El Futuro', schedule: [ { time: '10:00', topic: 'Tecnología y Bienestar', speaker: 'Dr. Ana María Rojas' }, { time: '12:00', topic: 'Clausura y Networking' }] },
    ],
    sponsors: {
      platinum: [{ name: 'Innovatech', logo: 'https://logo.clearbit.com/innovatech.com' }],
      gold: [{ name: 'Global Solutions', logo: 'https://logo.clearbit.com/globalsolutions.com' }, { name: 'Bancolombia', logo: 'https://logo.clearbit.com/bancolombia.com' }],
      silver: [{ name: 'Creative Minds', logo: 'https://logo.clearbit.com/creativeminds.com' }, { name: 'Rappi', logo: 'https://logo.clearbit.com/rappi.com' }],
    },
    allies: [{ name: 'Universidad del Rosario', logo: 'https://logo.clearbit.com/urosario.edu.co' }]
  },
  { 
    id: 2, type: 'Evento Principal', country: 'México', city: 'Ciudad de México', month: 'Marzo', day: 20, title: 'Foro de Innovación y Creatividad', description: 'Conectando mentes creativas para impulsar la innovación en las empresas mexicanas. Un evento de 3 días para explorar las últimas tendencias, aprender de casos de éxito y participar en talleres prácticos que cambiarán tu forma de pensar.', venue: 'WTC Ciudad de México', slotsAvailable: 89, price: 300,
    videos: ['s-y_1a_cfLw'],
    speakers: [
        { name: 'Javier "Chicharito" Hernández', title: 'Inversionista & Ex-Deportista', company: 'Angel Ventures', image: 'https://i.pravatar.cc/150?u=speaker4' },
        { name: 'Ximena Sariñana', title: 'Artista y Emprendedora Creativa', company: 'Sariñana Music', image: 'https://i.pravatar.cc/150?u=speaker5' },
    ],
    program: [
        { day: 'Día 1', schedule: [{ time: '10:00', topic: 'Creatividad Exponencial', speaker: 'Ximena Sariñana' }] },
        { day: 'Día 2', schedule: [{ time: '11:00', topic: 'De la Cancha a la Sala de Juntas', speaker: 'Javier Hernández' }] },
        { day: 'Día 3', schedule: [{ time: '12:00', topic: 'Panel de Clausura' }] },
    ],
    sponsors: {
        platinum: [{ name: 'Telcel', logo: 'https://logo.clearbit.com/telcel.com' }],
        gold: [{ name: 'Aeroméxico', logo: 'https://logo.clearbit.com/aeromexico.com' }],
        silver: [{ name: 'Cemex', logo: 'https://logo.clearbit.com/cemex.com' }]
    },
    allies: [{ name: 'Tec de Monterrey', logo: 'https://logo.clearbit.com/tec.mx' }]
  },
  { 
    id: 3, type: 'Evento Principal', country: 'Argentina', city: 'Buenos Aires', month: 'Abril', day: 10, title: 'Jornada de Salud Mental Laboral', description: 'Herramientas y estrategias para fomentar una cultura de salud mental positiva. Durante 3 días, neurocientíficos y coaches de alto rendimiento compartirán sus conocimientos para construir equipos más resilientes y enfocados.', venue: 'La Rural, Predio Ferial', slotsAvailable: 15, price: 220,
    videos: ['GOw5kYf7hLw', 'U345y_3w_yI'],
    speakers: [
        { name: 'Facundo Manes', title: 'Neurocientífico y Autor', company: 'Instituto INECO', image: 'https://i.pravatar.cc/150?u=speaker6' },
        { name: 'Gisela Dulko', title: 'Coach de Alto Rendimiento', company: 'Mental Performance', image: 'https://i.pravatar.cc/150?u=speaker7' },
    ],
    program: [
        { day: 'Día 1', schedule: [{ time: '09:00', topic: 'El Cerebro Creativo', speaker: 'Facundo Manes' }] },
        { day: 'Día 2', schedule: [{ time: '10:30', topic: 'Resiliencia y Foco', speaker: 'Gisela Dulko' }] },
        { day: 'Día 3', schedule: [{ time: '11:00', topic: 'Workshop de Bienestar' }] },
    ],
    sponsors: {
        platinum: [{ name: 'Mercado Libre', logo: 'https://logo.clearbit.com/mercadolibre.com' }],
        gold: [{ name: 'Globant', logo: 'https://logo.clearbit.com/globant.com' }],
        silver: [{ name: 'YPF', logo: 'https://logo.clearbit.com/ypf.com' }]
    },
    allies: [{ name: 'Universidad de Buenos Aires', logo: 'https://logo.clearbit.com/uba.ar' }]
  },
  { id: 4, type: 'Evento Principal', country: 'Chile', city: 'Santiago', month: 'Mayo', day: 25, title: 'Encuentro de Líderes del Futuro', description: 'Debates sobre liderazgo empático y el desarrollo de talento en la nueva era laboral. Un evento de 3 días diseñado para directivos y gerentes que buscan liderar con propósito y construir equipos de alto rendimiento.', venue: 'CentroParque', slotsAvailable: 120, price: 280, speakers:[], program:[], sponsors:{platinum:[], gold:[], silver:[]}, allies:[] },
  { id: 5, type: 'Evento Principal', country: 'Perú', city: 'Lima', month: 'Junio', day: 18, title: 'Conferencia de Creatividad Aplicada', description: 'Descubre cómo la creatividad puede transformar tu organización y resultados. Únete a 3 días de talleres, charlas inspiradoras y networking con los innovadores más destacados de la región.', venue: 'Swissôtel Lima', slotsAvailable: 75, price: 200, speakers:[], program:[], sponsors:{platinum:[], gold:[], silver:[]}, allies:[] },
  { 
    id: 10, type: 'Conferencia', country: 'Ecuador', city: 'Quito', month: 'Julio', day: 10, title: 'Creatividad Exponencial', 
    description: 'Una sesión intensiva de medio día para desbloquear el potencial creativo de tu equipo con técnicas probadas y casos de estudio inspiradores. Ideal para equipos que buscan un impulso de innovación.', 
    venue: 'Hotel JW Marriott Quito', slotsAvailable: 80, price: 95, 
    speakers: [{ name: 'Isabella Castillo', title: 'Autora de "Innovar o Morir"', company: 'Creative Spark', image: 'https://i.pravatar.cc/150?u=speaker8' }],
    program: [{ day: 'Mañana', schedule: [
        { time: '09:00', topic: 'Registro y Café de Bienvenida' },
        { time: '09:30', topic: 'Charla Principal: Desatando la Creatividad', speaker: 'Isabella Castillo' },
        { time: '11:00', topic: 'Taller Práctico: Ideación Rápida' },
        { time: '12:30', topic: 'Networking y Cierre' }
    ]}],
    sponsors: { platinum: [], gold: [{name: 'Banco Pichincha', logo: 'https://logo.clearbit.com/pichincha.com'}], silver: [] },
    allies: []
  },
  { id: 6, type: 'Evento Principal', country: 'Brasil', city: 'São Paulo', month: 'Agosto', day: 5, title: 'Congresso de Saúde Mental no Trabalho', description: 'O maior evento do Brasil focado em estratégias de saúde mental corporativa. Serão 3 dias com especialistas nacionais e internacionais, workshops e painéis de discussão sobre o futuro do trabalho.', venue: 'Expo Center Norte', slotsAvailable: 250, price: 350, speakers:[], program:[], sponsors:{platinum:[], gold:[], silver:[]}, allies:[] },
  { id: 7, type: 'Evento Principal', country: 'Colombia', city: 'Medellín', month: 'Septiembre', day: 22, title: 'Innovation Fest LATAM', description: 'Una celebración de 3 días de la innovación y la tecnología con startups y corporativos. El lugar ideal para encontrar inspiración, socios estratégicos y las próximas grandes ideas que moverán la aguja en LATAM.', venue: 'Plaza Mayor Medellín', slotsAvailable: 35, price: 260, speakers:[], program:[], sponsors:{platinum:[], gold:[], silver:[]}, allies:[] },
  { id: 8, type: 'Evento Principal', country: 'Uruguay', city: 'Montevideo', month: 'Octubre', day: 30, title: 'Summit de Cultura Organizacional', description: 'Construyendo culturas empresariales que priorizan a las personas. Un evento intensivo de 3 días para líderes de RRHH y directivos comprometidos con la creación de entornos de trabajo excepcionales.', venue: 'Radisson Montevideo Victoria Plaza', slotsAvailable: 90, price: 180, speakers:[], program:[], sponsors:{platinum:[], gold:[], silver:[]}, allies:[] },
  { 
    id: 11, type: 'Conferencia', country: 'Panamá', city: 'Ciudad de Panamá', month: 'Octubre', day: 15, title: 'Liderazgo Resiliente', 
    description: 'Conferencia de medio día enfocada en desarrollar habilidades de liderazgo para navegar la incertidumbre y guiar equipos hacia el éxito en entornos complejos. Una experiencia de aprendizaje intensiva y de alto impacto.', 
    venue: 'Hotel Riu Plaza Panamá', slotsAvailable: 60, price: 120, 
    speakers: [{ name: 'Ricardo Vargas', title: 'Coach Ejecutivo y Estratega', company: 'Líder Global', image: 'https://i.pravatar.cc/150?u=speaker9' }],
    program: [{ day: 'Tarde', schedule: [
        { time: '14:00', topic: 'Recepción y bienvenida' },
        { time: '14:30', topic: 'Claves de la Resiliencia en el Liderazgo Moderno', speaker: 'Ricardo Vargas' },
        { time: '16:00', topic: 'Estudio de Casos: Decisiones bajo presión' },
        { time: '17:30', topic: 'Cierre y cóctel de networking' }
    ]}],
    sponsors: { platinum: [], gold: [{name: 'Copa Airlines', logo: 'https://logo.clearbit.com/copaair.com'}], silver: [] },
    allies: [{name: 'Ciudad del Saber', logo: 'https://logo.clearbit.com/ciudaddelsaber.org'}]
  },
  { id: 9, type: 'Evento Principal', country: 'México', city: 'Monterrey', month: 'Noviembre', day: 12, title: 'Expo Capital Humano', description: 'El punto de encuentro para profesionales de recursos humanos y gestión de talento. Durante 3 días, explora las últimas tecnologías, estrategias de retención y tendencias en desarrollo de talento.', venue: 'Cintermex', slotsAvailable: 110, price: 290, speakers:[], program:[], sponsors:{platinum:[], gold:[], silver:[]}, allies:[] },
];

const newsData: NewsArticle[] = [
  {
    id: 1,
    title: "La Salud Mental se Convierte en Prioridad para las Empresas 'Unicornio' de LATAM",
    source: 'Forbes',
    date: '15 de Oct, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Un nuevo estudio revela que el 85% de las startups más valiosas de la región han implementado programas robustos de bienestar mental para atraer y retener talento clave.',
    link: '#',
    content: '<p>En un cambio de paradigma para el ecosistema tecnológico de América Latina, las empresas valoradas en más de mil millones de dólares, conocidas como "unicornios", están poniendo la salud mental en el centro de su estrategia de talento. Según un informe reciente de Tech Latam Insights, el 85% de estas compañías de alto crecimiento han lanzado programas integrales de bienestar mental en el último año.</p><p>La medida responde a una creciente demanda de los empleados por un mayor apoyo en un entorno laboral de alta presión. "Ya no es suficiente con ofrecer snacks gratis y una mesa de ping-pong", afirma la Dra. Elena Rodríguez, autora principal del estudio. "El talento de élite busca organizaciones que inviertan genuinamente en su bienestar a largo plazo. La salud mental es la nueva frontera de la compensación y los beneficios".</p><p>Empresas como Nubank, Rappi y Kavak están liderando la carga, ofreciendo desde acceso a terapia a través de aplicaciones hasta talleres de mindfulness y políticas de "desconexión digital" para combatir el burnout. Esta inversión no es puramente altruista; los líderes empresariales citan una correlación directa entre el bienestar de los empleados, la retención de talento y la capacidad de innovación sostenida.</p>'
  },
  {
    id: 2,
    title: '¿Puede la Creatividad Ser Medida? El Nuevo Desafío de RRHH',
    source: 'MIT Technology Review',
    date: '12 de Oct, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Expertos debaten sobre las nuevas métricas que buscan cuantificar la innovación y la capacidad creativa de los equipos, vinculándolas directamente a los resultados del negocio.',
    link: '#',
    content: '<p>El departamento de Recursos Humanos se enfrenta a un nuevo y complejo desafío: medir la creatividad. A medida que la innovación se convierte en el principal diferenciador competitivo, las empresas buscan desesperadamente formas de cuantificar y fomentar la capacidad creativa de sus equipos. El debate se centra en si la creatividad, a menudo vista como una chispa intangible, puede ser evaluada con la misma rigurosidad que las ventas o la productividad.</p><p>Están surgiendo nuevas herramientas y marcos, como el "Índice de Capacidad Creativa" (CCI), que evalúa factores como la seguridad psicológica, la diversidad cognitiva y la autonomía de los equipos. "No se trata de medir la genialidad de una sola persona", explica el Dr. Ken Robinson, pionero en el campo. "Se trata de medir las condiciones que permiten que la creatividad florezca a escala organizacional".</p><p>Sin embargo, los escépticos advierten sobre el riesgo de sofocar la innovación al intentar estandarizarla. Argumentan que una presión excesiva sobre métricas de creatividad podría llevar a un enfoque en ideas incrementales y seguras en lugar de avances disruptivos. El equilibrio, parece ser, está en usar estos datos no como un juicio, sino como un mapa para identificar y eliminar las barreras a la innovación.</p>'
  },
  {
    id: 3,
    title: 'Colombia Lidera en Iniciativas de Bienestar Laboral en Sudamérica',
    source: 'El Tiempo',
    date: '10 de Oct, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Empresas colombianas están a la vanguardia, adoptando modelos flexibles y programas de salud mental que están marcando la pauta para el resto de la región.',
    link: '#',
    content: '<p>Colombia se está posicionando como un líder inesperado en la revolución del bienestar corporativo en Sudamérica. Un informe comparativo de la Organización para la Cooperación y el Desarrollo Económicos (OCDE) destaca que las empresas con sede en Colombia muestran la tasa más alta de adopción de políticas de trabajo flexible y programas de apoyo a la salud mental en la región.</p><p>Compañías como Bancolombia, Ecopetrol y el Grupo Nutresa han sido elogiadas por sus enfoques integrales, que van más allá de los beneficios básicos para incluir coaching de resiliencia, semanas laborales de cuatro días y programas de apoyo para las familias de los empleados. "Entendimos que la productividad está directamente ligada al bienestar", comenta un directivo de una de las empresas destacadas. "Un empleado que se siente apoyado y equilibrado es un empleado más comprometido, creativo y leal".</p><p>Este enfoque proactivo está dando sus frutos, no solo en la mejora de los indicadores de clima laboral, sino también en la atracción de talento internacional. Colombia está demostrando que invertir en la cultura del bienestar no es solo una cuestión de responsabilidad social, sino una estrategia de negocio inteligente que puede impulsar la competitividad a nivel global.</p>'
  }
];

type View = 
  | 'home' | 'ranking' | 'events' | 'eventDetail' | 'terms' | 'privacy'
  | 'sello' | 'news' | 'newsDetail' | 'myEvents' | 'benefits' | 'reports' | 'profile';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationInitialType, setRegistrationInitialType] = useState<'person' | 'company'>('person');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [userRegisteredEvents, setUserRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Cambié booting por loading

  // ✅ REHIDRATACIÓN MEJORADA DE SESIÓN
  useEffect(() => {
    const initSession = async () => {
      const token = getToken();
      
      if (!token) {
        console.log('No token found, user not logged in');
        setLoading(false);
        return;
      }

      try {
        console.log('Token found, checking session...', token.substring(0, 20) + '...');
        const response = await apiProfile();
        console.log('Profile response:', response);
        
        if (response?.success && response?.data?.user) {
          const u = response.data.user;
          const userObj: User = {
            name: (u.full_name || `${u.first_name ?? ''} ${u.last_name ?? ''}`).trim(),
            email: u.email,
            company: u.company || undefined
          };
          
          setLoggedInUser(userObj);
          console.log('Session restored for:', u.email);
        } else {
          console.log('Invalid session, clearing token');
          clearToken();
        }
      } catch (error) {
        console.error('Session init error:', error);
        clearToken();
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, []);

  const handleOpenRegistration = (type: 'person' | 'company' = 'person') => {
    handleCloseModals();
    setRegistrationInitialType(type);
    setIsRegistrationModalOpen(true);
  };

  const handleOpenLogin = () => {
    handleCloseModals();
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    console.log('Login success, setting user:', user);
    setLoggedInUser(user);
    handleCloseModals();
  };

  const handleRegistrationSuccess = (user: User) => {
    console.log('Registration success, setting user:', user);
    setLoggedInUser(user);
    handleCloseModals();
  };

  // ✅ LOGOUT MEJORADO
  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    clearToken();
    setLoggedInUser(null);
    setUserRegisteredEvents([]);
    handleSetView('home');
    console.log('User logged out successfully');
  };

  const handleRegisterForEventAndLogin = (user: User, event: Event) => {
    setLoggedInUser(user);
    setUserRegisteredEvents(prevEvents => [...prevEvents, event]);
    handleCloseModals();
    handleSetView('myEvents');
  };

  const handleOpenForgotPassword = () => {
    handleCloseModals();
    setIsForgotPasswordModalOpen(true);
  };

  const handleOpenContact = () => {
    handleCloseModals();
    setIsContactModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsRegistrationModalOpen(false);
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsContactModalOpen(false);
  };

  const handleSetView = (newView: View) => {
    setSelectedEvent(null);
    setSelectedNews(null);
    window.scrollTo(0, 0);
    setView(newView);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0);
    setView('eventDetail');
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setView('events');
  };

  const handleSelectNews = (article: NewsArticle) => {
    setSelectedNews(article);
    window.scrollTo(0, 0);
    setView('newsDetail');
  };

  const handleBackToNews = () => {
    setSelectedNews(null);
    setView('news');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <HeroSection onRegisterClick={() => handleOpenRegistration('company')} />
            <ProblemSection />
            <SolutionSection />
            <HowItWorksSection />
            <BenefitsSection />
            <UpcomingEventsSection events={eventsData} setView={handleSetView} onSelectEvent={handleSelectEvent} />
            <NewsSection news={newsData} setView={handleSetView} onSelectNews={handleSelectNews}/>
            <CredibilitySection />
            <AlliesSection />
          </>
        );
      case 'ranking':
        return <RankingPage />;
      case 'events':
        return <EventsPage events={eventsData} onSelectEvent={handleSelectEvent} />;
      case 'eventDetail':
        return selectedEvent ? <EventDetailPage event={selectedEvent} onBack={handleBackToEvents} onRegisterSuccess={handleRegisterForEventAndLogin} /> : <EventsPage events={eventsData} onSelectEvent={handleSelectEvent} />;
      case 'news':
        return <NewsPage news={newsData} onSelectNews={handleSelectNews} />;
      case 'newsDetail':
        return selectedNews ? <NewsDetailPage article={selectedNews} onBack={handleBackToNews} /> : <NewsPage news={newsData} onSelectNews={handleSelectNews} />;
      case 'terms':
        return <TermsPage onBack={() => handleSetView('home')} />;
      case 'privacy':
        return <PrivacyPage onBack={() => handleSetView('home')} />;
      case 'sello':
        return <SelloPage 
                  onBack={() => handleSetView('home')} 
                  onRegisterClick={() => handleOpenRegistration('company')}
                  events={eventsData}
                  setView={handleSetView}
                  onSelectEvent={handleSelectEvent}
                  news={newsData}
                  onSelectNews={handleSelectNews}
                />;
      case 'myEvents':
        return loggedInUser ? <MyEventsPage user={loggedInUser} registeredEvents={userRegisteredEvents} onBack={() => handleSetView('home')} /> : null;
      case 'benefits':
        return <BenefitsPage onBack={() => handleSetView('home')} />;
      case 'reports':
        return <ReportsPage onBack={() => handleSetView('home')} />;
      case 'profile':
        return loggedInUser ? <ProfilePage user={loggedInUser} onUpdateUser={setLoggedInUser} onBack={() => handleSetView('home')} /> : null;
      default:
        return <HeroSection onRegisterClick={() => handleOpenRegistration('company')} />;
    }
  };

  // ✅ LOADING MEJORADO MIENTRAS SE REHIDRATA
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-2"></div>
          <p>Cargando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-light font-sans text-brand-dark">
      <Header 
        user={loggedInUser}
        setView={handleSetView} 
        onLoginClick={handleOpenLogin}
        onRegisterClick={handleOpenRegistration}
        onLogout={handleLogout}
      />
      <main>{renderContent()}</main>
      <Footer 
        onSetView={handleSetView}
        onOpenContact={handleOpenContact}
        onOpenRegister={handleOpenRegistration}
      />
      <RegistrationModal 
        isOpen={isRegistrationModalOpen} 
        onClose={handleCloseModals} 
        onSwitchToLogin={handleOpenLogin} 
        initialType={registrationInitialType}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseModals} 
        onSwitchToRegister={handleOpenRegistration}
        onForgotPasswordClick={handleOpenForgotPassword}
        onLoginSuccess={handleLoginSuccess}
      />
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={handleOpenLogin}
      />
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={handleCloseModals}
      />
    </div>
  );
};

export default App;
