'use client'
import React from 'react';
import { Heart, Users, Truck, Star } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function SobrePage() {
  const params = useParams();
  const lang = params.lang || 'pt';

  const translations = {
    pt: {
      title: 'Sobre Nós',
      subtitle: 'Levando o sabor do Brasil para Londres 🇧🇷',
      historyTitle: 'Nossa História',
      paragraph1: 'O Mercado Londres nasceu da saudade de casa. Somos brasileiros vivendo em Londres que sentíamos falta dos sabores autênticos do Brasil.',
      paragraph2: 'Fundado em 2020, começamos pequenos, importando alguns produtos para amigos e família. Hoje, servimos centenas de brasileiros e amantes da cultura brasileira em toda Londres.',
      paragraph3: 'Nossa missão é simples: trazer o melhor do Brasil para sua casa, mantendo a qualidade e autenticidade que você merece.',
      values: {
        passion: {
          title: 'Paixão',
          desc: 'Amor pelo Brasil e seus sabores únicos'
        },
        quality: {
          title: 'Qualidade',
          desc: 'Produtos autênticos e de primeira linha'
        },
        community: {
          title: 'Comunidade',
          desc: 'Conectando brasileiros em Londres'
        },
        speed: {
          title: 'Rapidez',
          desc: 'Entrega rápida e confiável'
        }
      }
    },
    en: {
      title: 'About Us',
      subtitle: 'Bringing the taste of Brazil to London 🇧🇷',
      historyTitle: 'Our Story',
      paragraph1: 'Mercado Londres was born from homesickness. We are Brazilians living in London who missed the authentic flavors of Brazil.',
      paragraph2: 'Founded in 2020, we started small, importing some products for friends and family. Today, we serve hundreds of Brazilians and lovers of Brazilian culture across London.',
      paragraph3: 'Our mission is simple: to bring the best of Brazil to your home, maintaining the quality and authenticity you deserve.',
      values: {
        passion: {
          title: 'Passion',
          desc: 'Love for Brazil and its unique flavors'
        },
        quality: {
          title: 'Quality',
          desc: 'Authentic and premium products'
        },
        community: {
          title: 'Community',
          desc: 'Connecting Brazilians in London'
        },
        speed: {
          title: 'Speed',
          desc: 'Fast and reliable delivery'
        }
      }
    }
  };

  const t = translations[lang] || translations.pt;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Nossa História */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {t.historyTitle}
              </h2>
              <div className="prose max-w-none text-gray-600 space-y-4">
                <p>{t.paragraph1}</p>
                <p>{t.paragraph2}</p>
                <p>{t.paragraph3}</p>
              </div>
            </div>

            {/* Valores */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* Paixão */}
              <div className="bg-white rounded-lg shadow p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t.values.passion.title}
                </h3>
                <p className="text-gray-600">
                  {t.values.passion.desc}
                </p>
              </div>

              {/* Qualidade */}
              <div className="bg-white rounded-lg shadow p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t.values.quality.title}
                </h3>
                <p className="text-gray-600">
                  {t.values.quality.desc}
                </p>
              </div>

              {/* Comunidade */}
              <div className="bg-white rounded-lg shadow p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t.values.community.title}
                </h3>
                <p className="text-gray-600">
                  {t.values.community.desc}
                </p>
              </div>

              {/* Rapidez */}
              <div className="bg-white rounded-lg shadow p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t.values.speed.title}
                </h3>
                <p className="text-gray-600">
                  {t.values.speed.desc}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
