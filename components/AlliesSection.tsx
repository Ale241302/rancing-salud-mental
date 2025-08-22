import React from 'react';

const allies = [
  { name: 'WellAdvisor', logo: 'https://welladvisor.co/wp-content/uploads/2025/06/logo-principal-1.png' },
  { name: 'Bibliomente', logo: 'https://bibliomente.com/wp-content/uploads/2025/08/bibliomente_logo.png' },
  { name: 'Salud Mental News', logo: 'https://saludmental.news/wp-content/uploads/2025/07/alia4.png' },
  { name: 'Psicologos Health', logo: 'https://psicologos.health/wp-content/uploads/2025/06/cropped-logo-1.png' },
  { name: 'MentalPeer', logo: 'https://storage.googleapis.com/welladvisor/logos/logo_01.jpeg' },
  { name: 'PHia', logo: 'https://storage.googleapis.com/welladvisor/logos/logo_02.jpeg' },
];

export const AlliesSection: React.FC = () => {
  // Duplicate for seamless scroll effect
  const extendedAllies = [...allies, ...allies, ...allies, ...allies];

  return (
    <section id="aliados" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold font-display text-brand-primary">Nuestros Aliados Estratégicos</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Colaboramos con los mejores para potenciar el bienestar y la creatividad en Latinoamérica.
            </p>
        </div>

        <div className="relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex animate-infinite-scroll">
            {extendedAllies.map((ally, index) => (
              <div key={`${ally.name}-${index}`} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-8 flex justify-center items-center h-24">
                <img
                  src={ally.logo}
                  alt={ally.name}
                  className="max-h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null; // Prevent infinite loop on placeholder error
                    target.src = `https://via.placeholder.com/150x50/F3F4F6/111827?text=${ally.name.replace(/\s/g, '+')}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
