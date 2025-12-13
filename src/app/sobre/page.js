import React from 'react';
import { Heart, Globe, Truck, Users } from 'lucide-react';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🇧🇷 Nossa História
            </h1>
            <p className="text-xl md:text-2xl">
              Levando o sabor do Brasil para Londres desde 2020
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Como Tudo Começou
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>
                  O <strong>Mercado Londres</strong> nasceu da saudade. Como brasileiros vivendo em Londres, 
                  sentíamos falta daqueles produtos que fazem parte da nossa cultura e memórias: 
                  o pão de queijo quentinho no café da manhã, o guaraná gelado no almoço, 
                  o açaí da tarde e os docinhos das festas de família.
                </p>
                <p>
                  Em 2020, decidimos transformar essa necessidade em uma solução não só para nós, 
                  mas para todos os brasileiros que moram em Londres. Começamos pequenos, 
                  importando alguns produtos favoritos e compartilhando com amigos.
                </p>
                <p>
                  Hoje, somos a maior referência em produtos brasileiros em Londres, 
                  atendendo centenas de famílias brasileiras que buscam matar a saudade de casa. 
                  Trabalhamos diretamente com fornecedores no Brasil para garantir a autenticidade 
                  e qualidade de cada produto.
                </p>
                <p>
                  Mais do que um mercado, somos uma ponte entre dois países, 
                  levando um pedacinho do Brasil para o coração de Londres. 🇧🇷❤️🇬🇧
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600">
              O que nos move todos os dias
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Paixão
              </h3>
              <p className="text-gray-600">
                Amor pelo que fazemos e pelos produtos que oferecemos
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Autenticidade
              </h3>
              <p className="text-gray-600">
                Produtos 100% brasileiros, importados diretamente
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Qualidade
              </h3>
              <p className="text-gray-600">
                Compromisso com a excelência em cada entrega
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Comunidade
