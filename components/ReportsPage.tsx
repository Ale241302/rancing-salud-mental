
import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ArrowTrendingUpIcon } from './icons/ArrowTrendingUpIcon';

const SvgBarChart: React.FC<{ title: string, data: { label: string, value: number, color: string }[] }> = ({ title, data }) => {
    const maxValue = 100;
    const chartHeight = 250;
    const svgPadding = { top: 30, right: 20, bottom: 40, left: 40 };
    const barGroupWidth = 65;
    const barWidth = 35;
    const chartWidth = data.length * barGroupWidth;
    const svgWidth = chartWidth + svgPadding.left + svgPadding.right;

    const [tooltip, setTooltip] = useState<{ x: number, y: number, label: string, value: number } | null>(null);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold font-display text-brand-primary mb-4">{title}</h3>
            <div className="overflow-x-auto pb-4">
                 <svg viewBox={`0 0 ${svgWidth} ${chartHeight + svgPadding.top + svgPadding.bottom}`} className="font-sans min-w-full" aria-label={title}>
                    <g className="text-xs fill-current text-gray-500">
                        {[0, 25, 50, 75, 100].map(val => (
                            <g key={val}>
                                <text x={svgPadding.left - 8} y={svgPadding.top + chartHeight - (val/maxValue * chartHeight)} textAnchor="end" dy="0.3em">{val}%</text>
                                <line x1={svgPadding.left - 4} y1={svgPadding.top + chartHeight - (val/maxValue * chartHeight)} x2={svgWidth - svgPadding.right} y2={svgPadding.top + chartHeight - (val/maxValue * chartHeight)} className="stroke-current text-gray-200" strokeDasharray="2,2" />
                            </g>
                        ))}
                    </g>
                    
                    <g>
                        {data.map((item, index) => {
                            const barHeight = (item.value / maxValue) * chartHeight;
                            const x = svgPadding.left + index * barGroupWidth;
                            const y = svgPadding.top + chartHeight - barHeight;
                            return (
                                <g key={item.label} role="group" aria-label={`${item.label}: ${item.value}%`} 
                                   onMouseEnter={() => setTooltip({ x: x + barGroupWidth / 2, y: y - 5, label: item.label, value: item.value })}
                                   onMouseLeave={() => setTooltip(null)}
                                >
                                    <rect x={x + (barGroupWidth - barWidth) / 2} y={y} width={barWidth} height={barHeight} className={`${item.color} transition-opacity duration-300 hover:opacity-75`} rx="4" ry="4">
                                        <animate attributeName="height" from="0" to={barHeight} dur="0.6s" fill="freeze" begin={`${index * 0.05}s`} calcMode="spline" keySplines="0.4 0 0.2 1"/>
                                        <animate attributeName="y" from={svgPadding.top + chartHeight} to={y} dur="0.6s" fill="freeze" begin={`${index * 0.05}s`} calcMode="spline" keySplines="0.4 0 0.2 1"/>
                                    </rect>
                                    <text x={x + barGroupWidth / 2} y={svgPadding.top + chartHeight + 20} textAnchor="middle" className="text-xs font-semibold fill-current text-gray-600">{item.label}</text>
                                </g>
                            );
                        })}
                    </g>
                     {tooltip && (
                        <g transform={`translate(${tooltip.x}, ${tooltip.y})`} className="pointer-events-none transition-opacity" style={{ opacity: 1 }}>
                            <rect x="-40" y="-30" width="80" height="30" rx="4" fill="rgba(17,24,39,0.8)" />
                            <text x="0" y="-15" textAnchor="middle" fill="white" className="text-xs font-bold">{`${tooltip.label}: ${tooltip.value}%`}</text>
                        </g>
                    )}
                </svg>
            </div>
        </div>
    );
};

const SvgPieChart: React.FC<{ title: string, data: { label: string, value: number, color: string }[] }> = ({ title, data }) => {
    const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativeAngle = -Math.PI / 2; // Start from 12 o'clock

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };
    
    return (
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold font-display text-brand-primary mb-4">{title}</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-40 h-40 transform -rotate-90">
                    {data.map(item => {
                        const percent = item.value / total;
                        const [startX, startY] = getCoordinatesForPercent(cumulativeAngle / (2 * Math.PI));
                        cumulativeAngle += (percent * 2 * Math.PI);
                        const [endX, endY] = getCoordinatesForPercent(cumulativeAngle / (2 * Math.PI));
                        const largeArcFlag = percent > 0.5 ? 1 : 0;
                        const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;

                        return (
                            <path
                                key={item.label}
                                d={pathData}
                                className={`${item.color.replace('bg-','fill-')} transition-transform duration-200`}
                                transform={hoveredSlice === item.label ? 'scale(1.08)' : 'scale(1)'}
                                onMouseEnter={() => setHoveredSlice(item.label)}
                                onMouseLeave={() => setHoveredSlice(null)}
                            />
                        );
                    })}
                </svg>
                <div className="text-sm space-y-2">
                    {data.map(item => (
                        <div key={item.label} className="flex items-center">
                            <span className={`${item.color} w-3 h-3 rounded-full mr-2`}></span>
                            <span className="text-gray-700">{item.label} ({((item.value/total)*100).toFixed(0)}%)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const SvgLineChart: React.FC<{ title: string, data: { year: number, value: number }[] }> = ({ title, data }) => {
    const [tooltip, setTooltip] = useState<{ x: number, y: number, year: number, value: number } | null>(null);
    const chartHeight = 200;
    const svgWidth = 400;
    const padding = { top: 20, right: 20, bottom: 30, left: 30 };
    const contentWidth = svgWidth - padding.left - padding.right;
    const contentHeight = chartHeight - padding.top - padding.bottom;
    
    const minYear = Math.min(...data.map(d => d.year));
    const maxYear = Math.max(...data.map(d => d.year));
    
    const getX = (year: number) => padding.left + ((year - minYear) / (maxYear - minYear)) * contentWidth;
    const getY = (value: number) => padding.top + contentHeight - (value / 100) * contentHeight;

    const linePath = data.map(p => `${getX(p.year)},${getY(p.value)}`).join(' L ');
    const areaPath = `M ${getX(data[0].year)},${getY(0)} L ${linePath} L ${getX(data[data.length - 1].year)},${getY(0)} Z`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold font-display text-brand-primary mb-4">{title}</h3>
            <div className="relative">
                <svg viewBox={`0 0 ${svgWidth} ${chartHeight}`} className="w-full">
                    {/* Y-axis grid */}
                     <g className="text-xs fill-current text-gray-400">
                        {[0, 50, 100].map(val => (
                             <g key={val}>
                                <text x={padding.left - 5} y={getY(val)} textAnchor="end" dy="0.3em">{val}</text>
                                <line x1={padding.left} y1={getY(val)} x2={svgWidth - padding.right} y2={getY(val)} className="stroke-current text-gray-200" strokeDasharray="2,2"/>
                             </g>
                        ))}
                    </g>
                    {/* X-axis labels */}
                     <g className="text-xs fill-current text-gray-500 font-semibold">
                        {data.map(p => (
                            <text key={p.year} x={getX(p.year)} y={chartHeight - padding.bottom + 15} textAnchor="middle">{p.year}</text>
                        ))}
                    </g>
                    {/* Area Gradient */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    <path d={areaPath} fill="url(#areaGradient)" />
                    {/* Line */}
                    <path d={`M ${linePath}`} fill="none" stroke="#1E3A8A" strokeWidth="2" />
                    {/* Points and hover targets */}
                    {data.map(p => (
                        <g key={p.year}>
                             <circle cx={getX(p.year)} cy={getY(p.value)} r="4" fill="#1E3A8A" className="transition-transform duration-200" style={{ transform: tooltip?.year === p.year ? 'scale(1.5)' : 'scale(1)'}} />
                             <rect x={getX(p.year) - 10} y={padding.top} width="20" height={contentHeight} fill="transparent"
                                onMouseEnter={() => setTooltip({ x: getX(p.year), y: getY(p.value), year: p.year, value: p.value })}
                                onMouseLeave={() => setTooltip(null)}
                             />
                        </g>
                    ))}
                     {tooltip && (
                        <g transform={`translate(${tooltip.x}, ${tooltip.y - 10})`} className="pointer-events-none">
                            <rect x="-35" y="-25" width="70" height="22" rx="4" fill="rgba(17,24,39,0.8)" />
                            <text x="0" y="-14" textAnchor="middle" fill="white" className="text-xs font-bold">{`${tooltip.year}: ${tooltip.value}`}</text>
                        </g>
                    )}
                </svg>
            </div>
        </div>
    );
};

export const ReportsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const burnoutData = [
        { label: 'Argentina', value: 45, color: 'fill-red-400' },
        { label: 'Chile', value: 42, color: 'fill-orange-400' },
        { label: 'México', value: 38, color: 'fill-amber-400' },
        { label: 'Perú', value: 35, color: 'fill-yellow-400' },
        { label: 'Colombia', value: 32, color: 'fill-lime-400' },
        { label: 'Brasil', value: 28, color: 'fill-green-400' },
    ];
    
    const initiativesData = [
        { label: 'Flexibilidad Laboral', value: 40, color: 'bg-blue-500' },
        { label: 'Apoyo Psicológico', value: 30, color: 'bg-sky-500' },
        { label: 'Talleres de Bienestar', value: 15, color: 'bg-cyan-500' },
        { label: 'Programas de Liderazgo', value: 10, color: 'bg-teal-500' },
        { label: 'Otros', value: 5, color: 'bg-gray-400' },
    ];
    
    const wellbeingData = [
        { year: 2021, value: 55 },
        { year: 2022, value: 65 },
        { year: 2023, value: 72 },
        { year: 2024, value: 80 },
    ];

    return (
        <section id="reports-page" className="py-16 md:py-24 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Volver
                    </button>
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-display text-brand-primary">
                        Dashboard de Reportes
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Insights y estadísticas sobre el estado de la salud mental y la creatividad en el entorno laboral de Latinoamérica.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-2">
                        <SvgBarChart title="Índice de Burnout por País (2024)" data={burnoutData} />
                    </div>
                    <div className="space-y-8">
                        <SvgPieChart title="Iniciativas de Bienestar Más Comunes" data={initiativesData} />
                         <div className="grid grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <LightbulbIcon className="w-12 h-12 mx-auto text-brand-accent mb-2"/>
                                <p className="text-3xl font-bold font-display text-brand-primary">68</p>
                                <p className="text-gray-500">Puntaje de Creatividad Promedio</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <ArrowTrendingUpIcon className="w-12 h-12 mx-auto text-green-500 mb-2"/>
                                <p className="text-3xl font-bold font-display text-brand-primary">+12%</p>
                                <p className="text-gray-500">Inversión en Bienestar vs 2023</p>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-8">
                        <SvgLineChart title="Evolución del Puntaje de Bienestar LATAM" data={wellbeingData} />
                    </div>
                </div>
            </div>
        </section>
    );
};
