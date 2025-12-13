'use client'

import React from 'react';
import { Heart, Users, Truck, Star } from 'lucide-react';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sobre Nós
            </h1>
            <p className="text-xl md:text-2xl">
              Levando o sabor do Brasil para Londres 🇧🇷
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nossa História
              </h2>
              <div className="prose max-w-none text-gray-600 space-y-4">
                <p>
                  O Mercado Londres nasceu da saudade de casa. Somos brasileiros vivendo em Londres 
                  que sentíamos falta dos sabores autênticos do Brasil.
                </p>
                <p>
                  Fundado em 2020, começamos pequenos, importando alguns produtos para amigos e família. 
                  Hoje, servimos centenas de brasileiros e amantes da cultura brasileira em toda Londres.
                </p>
                <p>
                  Nossa missão é simples: trazer o melhor do Brasil para sua casa, mantendo a qualidade 
                  e autenticidade que você merece.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Paixão
                </h3>
                <p className="text-gray-600">
                  Amor pelo Brasil e seus sabores únicos
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Qualidade
                </h3>
                <p className="text-gray-600">
                  Produtos autênticos e de primeira linha
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Comunidade
                </h3>
                <p className="text-gray-600">
                  Conectando brasileiros em Londres
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Rapidez
                </h3>
                <p className="text-gray-600">
                  Entrega rápida e confiável
                </p>
            </div>
      </section>
    </div>
  );
}
