'use client'

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  // Substitua pelo seu número real (com código do país e sem espaços)
  // Exemplo para Londres: 44 + número
  const phoneNumber = "442012345678"; 
  const message = encodeURIComponent("Olá! Estou no site Prime Brasil Market e gostaria de informações.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Falar pelo WhatsApp"
    >
      {/* Texto que aparece quando passa o mouse (opcional) */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap">
        Fale Conosco
      </span>
      <MessageCircle className="w-8 h-8" />
      
      {/* Notificaçãozinha pulsante para chamar atenção */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
      </span>
    </a>
  );
}
