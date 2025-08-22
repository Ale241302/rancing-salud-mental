import React from 'react';
export const TicketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
        <path d="M21 15v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
        <path d="M3 12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2" />
        <path d="M9 12V5" />
        <path d="M15 12V5" />
        <path d="M9 19v-3" />
        <path d="M15 19v-3" />
    </svg>
);
