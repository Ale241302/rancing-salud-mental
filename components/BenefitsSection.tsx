import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';


const BenefitItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
        <span className="text-gray-700 text-lg">{children}</span>
    </li>
);

export const BenefitsSection: React.FC = () => {
    return (
        <section id="beneficios" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="lg:w-1/2">
                        <img 
                            src="https://picsum.photos/id/1015/800/600" 
                            alt="Equipo de trabajo colaborando" 
                            className="rounded-lg shadow-2xl object-cover w-full h-full"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-primary">¿Por qué tu empresa debe participar?</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Esto no es un gasto, es la mejor inversión en tu activo más valioso: tu gente.
                        </p>
                        <ul className="mt-8 space-y-4">
                            <BenefitItem>
                                <span className="font-semibold">Conviértete en un imán de talento.</span> Atrae y fideliza a los mejores profesionales que buscan empresas con un compromiso auténtico por el bienestar integral.
                            </BenefitItem>
                            <BenefitItem>
                                <span className="font-semibold">Fortalece tu marca empleadora.</span> Posiciónate como una organización líder y un referente de cultura positiva en toda Latinoamérica.
                            </BenefitItem>
                            <BenefitItem>
                                <span className="font-semibold">Toma decisiones basadas en datos.</span> Accede a insights y benchmarks exclusivos para impulsar la productividad y fomentar un ambiente de innovación real.
                            </BenefitItem>
                            <BenefitItem>
                                <span className="font-semibold">Diferénciate de la competencia.</span> Obtén una ventaja competitiva sostenible que va más allá del producto: una cultura que inspira.
                            </BenefitItem>
                            <BenefitItem>
                                <span className="font-semibold">Mejora tus resultados de negocio.</span> Una cultura saludable no solo reduce la rotación, sino que también impulsa la creatividad y el rendimiento financiero.
                            </BenefitItem>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};