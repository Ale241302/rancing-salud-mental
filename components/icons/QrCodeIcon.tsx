
import React from 'react';

export const QrCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" {...props}>
    <path d="M104 40H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 64H56V56h48v48Z" />
    <path d="M200 40h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 64h-48V56h48v48Z" />
    <path d="M104 136H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16Zm0 64H56v-48h48v48Z" />
    <path d="M208 136h-24v24h-16v16h16v24h-24v16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16Zm-8 56h-16v-16h16Zm-16-40v-16h16v24h-24v-16h8Z" />
    <path d="M152 136h16v24h-16Z" />
  </svg>
);
