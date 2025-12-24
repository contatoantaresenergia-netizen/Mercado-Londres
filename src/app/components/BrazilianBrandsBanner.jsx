'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BrazilianBrandsBanner({ lang = 'pt' }) {
  const router = useRouter();

  const translations = {
    pt: {
      title: 'Marcas Brasileiras',
      description: 'Trabalhamos com as marcas mais famosas do mercado brasileiro e, portanto, garantimos produtos de qualidade com valor agregado para nossos clientes.',
      button: 'Saiba Mais'
    },
    en: {
      title: 'Brazilian Brands',
      description: 'We work with the most famous brands in the Brazilian market and therefore, we guarantee quality products with added value for our customers.',
      button: 'Learn More'
    }
  };

  const t = translations[lang] || translations.pt;

  // Marcas organizadas em 3 linhas de 4
  const brandRows = [
    [
      { name: 'Texas', color: 'from-red-600 to-red-500' },
      { name: 'Tramontina', color: 'from-blue-800 to-blue-700' },
      { name: 'Marilan', color: 'from-yellow-500 to-yellow-400' },
      { name: 'Yoki', color: 'from-red-600 to-pink-500' }
    ],
    [
      { name: 'Zero-Cal', color: 'from-blue-600 to-blue-500' },
      { name: 'Garoto', color: 'from-yellow-600 to-yellow-500' },
      { name: 'Hemmer', color: 'from-purple-700 to-purple-600' },
      { name: 'Knorr', color: 'from-green-600 to-green-500' }
    ],
    [
      { name: 'Lacta', color: 'from-purple-600 to-purple-500' },
      { name: 'Nestlé', color: 'from-blue-700 to-blue-600' },
      { name: 'Renata', color: 'from-blue-800 to-blue-700' },
      { name: 'Compai', color: 'from-red-700 to-red-600' }
    ]
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Lado Esquerdo - Texto (2 colunas) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent leading-tight">
              {t.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t.description}
            </p>
            <button
              onClick={() => router.push(`/${lang}/produtos`)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-green-600 text-green-600 font-bold rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wide"
            >
              {t.button}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Lado Direito - Grid de Logos (3 colunas) */}
          <div className="lg:col-span-3 space-y-6">
            {brandRows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {row.map((brand, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 flex items-center justify-center border-2 border-gray-100 hover:border-green-300 cursor-pointer overflow-hidden relative"
                  >
                    {/* Efeito de fundo gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Container do logo */}
                    <div className="relative w-full h-20 flex items-center justify-center">
                      <div className="text-center">
                        <span className={`text-xl font-black bg-gradient-to-r ${brand.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block`}>
                          {brand.name}
                        </span>
                      </div>
                    </div>

                    {/* Brilho no hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
