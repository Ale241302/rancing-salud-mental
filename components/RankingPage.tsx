import React, { useState, useMemo } from 'react';
import { MedalIcon } from './icons/MedalIcon';

type Company = {
  rank: number;
  name: string;
  score: number;
  country?: string;
  sector?: string;
};

const generateRankingData = (): Record<string, Company[]> => {
  const countries = ['Colombia', 'Ecuador', 'Perú', 'Chile', 'Brasil', 'Argentina', 'Uruguay', 'Bolivia', 'Panamá', 'México'];
  const prefixes = ['Grupo', 'Corp', 'Inversiones', 'Soluciones', 'Tecno', 'Consultores', 'Global', 'Latam', 'Estrella', 'Andes', 'Pacífico', 'Atlántico'];
  const cores = ['Digital', 'Creativa', 'Futuro', 'Nexus', 'Quantum', 'Astra', 'Nova', 'Apex', 'Zenith', 'Orion', 'Innovate', 'Vision', 'Core', 'Data'];
  const suffixes = ['S.A.', 'S.A.S.', 'Ltda.', 'Group', 'Tech', 'Labs', 'Analytics', 'Consulting'];
  const sectors = ['Tecnología', 'Finanzas', 'Salud', 'Consumo Masivo', 'Energía', 'Industrial', 'Retail', 'Servicios Profesionales'];

  const generateCompanyName = () => `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${cores[Math.floor(Math.random() * cores.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  
  const rankingData: Record<string, Company[]> = {};
  const usedNames = new Set<string>();

  countries.forEach(country => {
    const countryCompanies: Company[] = [];
    for (let i = 1; i <= 50; i++) {
      let name;
      do {
        name = generateCompanyName();
      } while (usedNames.has(name));
      usedNames.add(name);

      let score = parseFloat((99.5 - (i * 0.4) - (Math.random() * 2)).toFixed(1));
      if (i > 1 && score >= countryCompanies[i - 2].score) {
        score = parseFloat((countryCompanies[i - 2].score - (Math.random() * 0.5 + 0.1)).toFixed(1));
      }
      if (score > 100) score = 100.0;
      if (score < 70) score = parseFloat((70 + Math.random() * 5).toFixed(1));
      
      const sector = sectors[Math.floor(Math.random() * sectors.length)];
      countryCompanies.push({ rank: i, name, score, sector });
    }
    rankingData[country] = countryCompanies;
  });

  return rankingData;
};

const medalColors: { [key: number]: string } = {
  1: 'text-brand-accent',
  2: 'text-slate-400',
  3: 'text-orange-500'
};

const CountryDistributionChart: React.FC<{ data: [string, number][] }> = ({ data }) => {
    if (data.length === 0) return null;
    const maxCount = Math.max(1, ...data.map(([, count]) => count));

    return (
        <div className="mb-12 bg-brand-light p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold font-display text-brand-primary mb-4 text-center">Distribución por País en el Top 50 LATAM</h3>
            <div className="space-y-3">
                {data.map(([country, count]) => (
                    <div key={country} className="grid grid-cols-[8rem,1fr,2rem] items-center gap-2 text-sm">
                        <span className="font-semibold text-gray-700 truncate text-right">{country}</span>
                        <div className="bg-gray-200 rounded-full h-5 w-full">
                            <div
                                className="bg-brand-secondary h-5 rounded-full flex items-center justify-end"
                                style={{ width: `${(count / maxCount) * 100}%` }}
                            >
                            </div>
                        </div>
                        <span className="font-bold text-brand-primary text-left">{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const RankingPage: React.FC = () => {
  const rankingData = useMemo(() => generateRankingData(), []);

  const latamRanking = useMemo(() => {
    const allCompaniesWithCountry: Company[] = [];
    Object.entries(rankingData).forEach(([country, companies]) => {
        companies.forEach(company => {
            allCompaniesWithCountry.push({ ...company, country });
        });
    });

    return allCompaniesWithCountry
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
      .map((company, index) => ({
        ...company,
        rank: index + 1,
      }));
  }, [rankingData]);

  const countries = Object.keys(rankingData);
  const views = ['LATAM', ...countries];
  const [selectedView, setSelectedView] = useState('LATAM');

  const companyData = selectedView === 'LATAM' ? latamRanking : rankingData[selectedView] || [];
  
  const countryDistribution = useMemo(() => {
    return latamRanking.reduce((acc, company) => {
        if (company.country) {
            acc[company.country] = (acc[company.country] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);
  }, [latamRanking]);

  const sortedCountriesForChart = useMemo(() => {
      return Object.entries(countryDistribution).sort(([, a], [, b]) => b - a);
  }, [countryDistribution]);

  return (
    <section id="ranking" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary">
            Ranking LATAM 2024
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Top 50 empresas en Salud Mental y Creatividad. Un vistazo a las organizaciones que lideran el bienestar y la innovación en la región.
          </p>
        </div>

        <div className="mb-8 flex justify-center flex-wrap gap-2">
          {views.map(view => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-300 ${
                selectedView === view
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-brand-primary hover:bg-brand-light ring-1 ring-inset ring-gray-300'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
        
        {selectedView === 'LATAM' && <CountryDistributionChart data={sortedCountriesForChart} />}

        <div className="bg-white rounded-lg shadow-xl overflow-hidden ring-1 ring-gray-200">
          <div className={`hidden md:grid ${selectedView === 'LATAM' ? 'md:grid-cols-[4rem_1fr_8rem_8rem_8rem]' : 'md:grid-cols-[4rem_1fr_8rem]'} bg-brand-light text-left`}>
            <div className="p-4 font-bold text-brand-primary tracking-wider">#</div>
            <div className="p-4 font-bold text-brand-primary tracking-wider">Empresa</div>
            {selectedView === 'LATAM' && <div className="p-4 font-bold text-brand-primary tracking-wider">País</div>}
            {selectedView === 'LATAM' && <div className="p-4 font-bold text-brand-primary tracking-wider">Sector</div>}
            <div className="p-4 font-bold text-brand-primary tracking-wider text-right">Puntaje</div>
          </div>
          <div className="divide-y divide-gray-200">
            {companyData.map((company) => (
              <div key={`${company.rank}-${company.name}`} className={`grid grid-cols-[auto_1fr] ${selectedView === 'LATAM' ? 'md:grid-cols-[4rem_1fr_8rem_8rem_8rem]' : 'md:grid-cols-[4rem_1fr_8rem]'} items-center hover:bg-gray-50`}>
                <div className="p-4 font-bold text-brand-secondary text-center flex items-center justify-center">
                  <div className="w-6 mr-2 flex-shrink-0">
                    {company.rank <= 3 && <MedalIcon className={`w-6 h-6 ${medalColors[company.rank]}`} fill="currentColor" />}
                  </div>
                  {company.rank}
                </div>
                <div className="p-4 font-medium text-gray-800">
                  <p>{company.name}</p>
                   {selectedView === 'LATAM' && company.country && (
                    <p className="md:hidden text-sm text-gray-500 mt-1">{company.country} &bull; {company.sector}</p>
                  )}
                  <p className="md:hidden text-brand-primary font-bold text-sm mt-1">Puntaje: {company.score}</p>
                </div>
                {selectedView === 'LATAM' && <div className="hidden md:block p-4 text-gray-600">{company.country}</div>}
                {selectedView === 'LATAM' && <div className="hidden md:block p-4 text-gray-600">{company.sector}</div>}
                <div className="hidden md:block p-4 font-display font-bold text-lg text-brand-primary text-right">
                  {company.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};