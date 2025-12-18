'use client'

import React from 'react';
import { Truck, PackageCheck, ThermometerSnowflake, CalendarDays, MapPin, Info } from 'lucide-react';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
          Entrega & Logística
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Levamos o melhor do Brasil até a sua casa no Reino Unido com máxima segurança e frescor.
        </p>
      </section>

      <div className="container mx-auto px-4 -mt-8">
        {/* Destaque Frete Grátis */}
        <div className="bg-yellow-400 text-green-900 p-6 rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 mb-12 border-2 border-yellow-500">
          <div className="flex items-center gap-4">
            <Truck className="w-12 h-12 shrink-0" />
            <div>
              <h2 className="text-2xl font-black uppercase leading-tight">Entrega Grátis Disponível</h2>
              <p className="font-medium">Para todo o Reino Unido (Mainland) em compras qualificadas.</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-bold uppercase opacity-80">Terça a Sexta</p>
            <p className="text-3xl font-black">Acima de £70</p>
          </div>
        </div>

        {/* Grade de Informações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Tabela de Preços */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays className="text-green-600 w-8 h-8" />
              <h3 className="text-2xl font-bold text-gray-800">Prazos e Valores</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-bold text-gray-700">Terça-Feira a Sexta-Feira</p>
                  <p className="text-sm text-gray-500 italic">Caixas até 20kg (DPD)</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-green-700">£5.99</p>
                  <p className="text-xs font-bold text-green-600">GRÁTIS {'>'} £70</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-bold text-gray-700">Sábado</p>
                  <p className="text-sm text-gray-500 italic">Entrega Especial</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-green-700">£6.99</p>
                  <p className="text-xs font-bold text-green-600">GRÁTIS {'>'} £100</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg flex gap-3">
                <Info className="text-blue-500 w-6 h-6 shrink-0" />
                <p className="text-sm text-blue-800">
                  <strong>Handling Fee (£1.99):</strong> Taxa fixa de manuseio aplicada em todos os pedidos para garantir embalagem premium.
                </p>
              </div>
            </div>
          </div>

          {/* Qualidade e Manuseio */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <ThermometerSnowflake className="text-blue-500 w-8 h-8" />
              <h3 className="text-2xl font-bold text-gray-800">Segurança Alimentar</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Para garantir que seus produtos cheguem com a máxima qualidade, utilizamos um padrão rigoroso de embalagem:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PackageCheck className="text-green-600 w-6 h-6 shrink-0" />
                <span className="text-gray-700"><strong>Bolsas Térmicas Lacradas:</strong> Proteção total contra variações de temperatura.</span>
              </li>
              <li className="flex items-start gap-3">
                <ThermometerSnowflake className="text-blue-600 w-6 h-6 shrink-0" />
                <span className="text-gray-700"><strong>Placas de Gelo:</strong> Conservação prolongada para itens refrigerados.</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-green-600 w-6 h-6 shrink-0" />
                <span className="text-gray-700"><strong>Parceiro Logístico:</strong> Entregas via DPD com rastreamento em tempo real.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção de Postcodes */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="text-red-500 w-8 h-8" />
            <h3 className="text-2xl font-bold text-gray-800">Áreas Atendidas (Postcodes)</h3>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl overflow-y-auto max-h-96">
             <div className="columns-2 md:columns-3 lg:columns-4 gap-8 text-sm text-gray-600 font-mono">
                {/* Aqui você pode colar a sua lista de postcodes formatada ou apenas referenciá-la */}
                <p className="mb-2 font-bold text-green-700">LONDON & SURROUNDINGS</p>
                <p>E1, E10, E11, E12, E13, E14, E15, E16, E17, E18, E2, E3, E4, E5, E6, E7, E8, E9, E1W</p>
                <p>N1, N10, N11, N12... (e todos os outros listados)</p>
                <p className="mt-4 mb-2 font-bold text-green-700">UK MAINLAND</p>
                <p>AB, AL, B, BA, BB, BD, BH, BL, BN, BS, CA, CB, CF, CH, CM, CO, CT, CV, CW, DA, DD, DE, DG, DH, DL, DN, DT, DY, EN, EH, EX, FK, FY, G, GL, GU, HD, HG, HP, HR, HU, HX, IP, KA, KY, L, LA, LD, LE, LL, LN, LS, LU, M, ME, MK, ML, NE, NG, NN, NP, NR, OL, OX, PA, PE, PH, PL, PO, PR, RG, RH, S, SA, SG, SK, SL, SN, SO, SP, SR, SS, ST, SY, TA, TD, TF, TN, TQ, TR, TS, WA, WD, WF, WN, WR, WS, WV, YO</p>
             </div>
          </div>
          <p className="mt-6 text-sm text-gray-500 italic">
            * Rotas "ZONE UK OFFSHORE" possuem valores diferentes. Consulte nosso suporte para mais detalhes.
          </p>
        </section>
      </div>
    </div>
  );
}

// Pequeno ajuste de ícone que falta no import
function ShieldCheck({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
  );
}
