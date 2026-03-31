import { Truck, PackageCheck, ThermometerSnowflake, CalendarDays, MapPin, Info } from 'lucide-react';

function ShieldCheck({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

export default function DeliveryPage({ params }) {
  const isPT = params?.lang === 'pt';

  const t = {
    hero_title:       isPT ? 'Entrega & Logística'                                          : 'Delivery & Logistics',
    hero_sub:         isPT ? 'Levamos o melhor do Brasil até a sua casa no Reino Unido com máxima segurança e frescor.'
                           : 'We bring the best of Brazil to your home in the UK with maximum safety and freshness.',
    free_title:       isPT ? 'Entrega Grátis Disponível'                                    : 'Free Delivery Available',
    free_sub:         isPT ? 'Para todo o Reino Unido (Mainland) em compras qualificadas.'  : 'For all UK Mainland on qualifying orders.',
    tue_fri:          isPT ? 'Terça-Feira a Sexta-Feira'                                    : 'Tuesday to Friday',
    tue_fri_sub:      isPT ? 'Caixas até 20kg (DPD)'                                        : 'Boxes up to 20kg (DPD)',
    saturday:         isPT ? 'Sábado'                                                       : 'Saturday',
    saturday_sub:     isPT ? 'Entrega Especial'                                             : 'Special Delivery',
    above:            isPT ? 'GRÁTIS acima de'                                              : 'FREE over',
    handling_title:   isPT ? 'Handling Fee (£1.99):'                                        : 'Handling Fee (£1.99):',
    handling_text:    isPT ? 'Taxa fixa de manuseio aplicada em todos os pedidos para garantir embalagem premium.'
                           : 'Fixed handling fee applied to all orders to ensure premium packaging.',
    prices_title:     isPT ? 'Prazos e Valores'                                             : 'Delivery Times & Costs',
    safety_title:     isPT ? 'Segurança Alimentar'                                          : 'Food Safety',
    safety_intro:     isPT ? 'Para garantir que seus produtos cheguem com a máxima qualidade, utilizamos um padrão rigoroso de embalagem:'
                           : 'To ensure your products arrive in top condition, we follow a strict packaging standard:',
    thermal:          isPT ? 'Bolsas Térmicas Lacradas:'                                    : 'Sealed Thermal Bags:',
    thermal_text:     isPT ? 'Proteção total contra variações de temperatura.'              : 'Full protection against temperature changes.',
    ice:              isPT ? 'Placas de Gelo:'                                              : 'Ice Packs:',
    ice_text:         isPT ? 'Conservação prolongada para itens refrigerados.'              : 'Extended preservation for refrigerated items.',
    dpd:              isPT ? 'Parceiro Logístico:'                                          : 'Logistics Partner:',
    dpd_text:         isPT ? 'Entregas via DPD com rastreamento em tempo real.'             : 'Delivered by DPD with real-time tracking.',
    postcodes_title:  isPT ? 'Áreas Atendidas (Postcodes)'                                  : 'Delivery Areas (Postcodes)',
    london:           isPT ? 'LONDRES E ARREDORES'                                          : 'LONDON & SURROUNDINGS',
    mainland:         isPT ? 'UK MAINLAND'                                                  : 'UK MAINLAND',
    offshore_note:    isPT ? '* Rotas "ZONE UK OFFSHORE" possuem valores diferentes. Consulte o nosso suporte para mais detalhes.'
                           : '* "ZONE UK OFFSHORE" routes have different rates. Please contact our support for more details.',
    free_label:       isPT ? 'Terça a Sexta'                                                : 'Tue to Fri',
    free_amount:      isPT ? 'Acima de £70'                                                 : 'Over £70',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* Hero */}
      <section className="bg-green-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
          {t.hero_title}
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t.hero_sub}
        </p>
      </section>

      <div className="container mx-auto px-4 -mt-8">

        {/* Free Delivery Banner */}
        <div className="bg-yellow-400 text-green-900 p-6 rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 mb-12 border-2 border-yellow-500">
          <div className="flex items-center gap-4">
            <Truck className="w-12 h-12 shrink-0" />
            <div>
              <h2 className="text-2xl font-black uppercase leading-tight">{t.free_title}</h2>
              <p className="font-medium">{t.free_sub}</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-bold uppercase opacity-80">{t.free_label}</p>
            <p className="text-3xl font-black">{t.free_amount}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Pricing */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays className="text-green-600 w-8 h-8" />
              <h3 className="text-2xl font-bold text-gray-800">{t.prices_title}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-bold text-gray-700">{t.tue_fri}</p>
                  <p className="text-sm text-gray-500 italic">{t.tue_fri_sub}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-green-700">£6.99</p>
                  <p className="text-xs font-bold text-green-600">{t.above} £70</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-bold text-gray-700">{t.saturday}</p>
                  <p className="text-sm text-gray-500 italic">{t.saturday_sub}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-green-700">£8.99</p>
                  <p className="text-xs font-bold text-green-600">{t.above} £100</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg flex gap-3">
                <Info className="text-blue-500 w-6 h-6 shrink-0" />
                <p className="text-sm text-blue-800">
                  <strong>{t.handling_title}</strong> {t.handling_text}
                </p>
              </div>
            </div>
          </div>

          {/* Food Safety */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <ThermometerSnowflake className="text-blue-500 w-8 h-8" />
              <h3 className="text-2xl font-bold text-gray-800">{t.safety_title}</h3>
            </div>
            <p className="text-gray-600 mb-6">{t.safety_intro}</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PackageCheck className="text-green-600 w-6 h-6 shrink-0" />
                <span className="text-gray-700"><strong>{t.thermal}</strong> {t.thermal_text}</span>
              </li>
              <li className="flex items-start gap-3">
                <ThermometerSnowflake className="text-blue-600 w-6 h-6 shrink-0" />
                <span className="text-gray-700"><strong>{t.ice}</strong> {t.ice_text}</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-green-600 w-6 h-6 shrink-0" />
                <span className="text-gray-700"><strong>{t.dpd}</strong> {t.dpd_text}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Postcodes */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="text-red-500 w-8 h-8" />
            <h3 className="text-2xl font-bold text-gray-800">{t.postcodes_title}</h3>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl overflow-y-auto max-h-96">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-8 text-sm text-gray-600 font-mono">
              <p className="mb-2 font-bold text-green-700">{t.london}</p>
              <p className="mb-1">E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18, E1W</p>
              <p className="mb-1">EC1, EC1A, EC1M, EC1N, EC1R, EC1V, EC1Y</p>
              <p className="mb-1">EC2, EC2A, EC2M, EC2N, EC2R, EC2V, EC2Y</p>
              <p className="mb-1">EC3, EC3A, EC3M, EC3N, EC3P, EC3R, EC3V</p>
              <p className="mb-1">EC4, EC4A, EC4M, EC4N, EC4R, EC4V, EC4Y</p>
              <p className="mb-1">N1–N22, NW1–NW11</p>
              <p className="mb-1">SE1–SE28</p>
              <p className="mb-1">SW1–SW20, SW1A, SW1E, SW1H, SW1P, SW1V, SW1W, SW1X, SW1Y</p>
              <p className="mb-1">W, WC</p>
              <p className="mb-1">BR, CR, HA, IG, KT, RM, SM, TW, UB</p>
              <p className="mt-4 mb-2 font-bold text-green-700">{t.mainland}</p>
              <p>AB, AL, B, BA, BB, BD, BH, BL, BN, BS, CA, CB, CF, CH, CM, CO, CT, CV, CW, DA, DD, DE, DG, DH, DL, DN, DT, DY, EH, EN, EX, FK, FY, G, GL, GU, HD, HG, HP, HR, HU, HX, IP, KA, KY, L, LA, LD, LE, LL, LN, LS, LU, M, ME, MK, ML, NE, NG, NN, NP, NR, OL, OX, PA, PE, PH, PL, PO, PR, RG, RH, S, SA, SG, SK, SL, SN, SO, SP, SR, SS, ST, SY, TA, TD, TF, TN, TQ, TR, TS, WA, WD, WF, WN, WR, WS, WV, YO</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500 italic">{t.offshore_note}</p>
        </section>

      </div>
    </div>
  );
}
