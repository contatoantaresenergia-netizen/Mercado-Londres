'use client'

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl md:text-2xl">
              Estamos aqui para ajudar! Fale conosco em português 🇧🇷
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Nossas Informações
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      Telefone
                    </h3>
                    <p className="text-gray-600">+44 20 1234 5678</p>
                    <p className="text-sm text-gray-500 mt-1">
                      WhatsApp disponível
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600">contato@mercadolondres.co.uk</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Respondemos em até 24h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      Endereço
                    </h3>
                    <p className="text-gray-600">
                      244 Horton Road<br />
                      London, SL3 9HN<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      Horário de Atendimento
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Segunda a Sexta: 9h - 18h</p>
                      <p>Sábado: 10h - 16h</p>
                      <p>Domingo: Fechado</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">🗺️ Mapa - Londres, UK</p>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Envie uma Mensagem
                </h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Mensagem Enviada! ✉️
                    </h3>
                    <p className="text-gray-600">
                      Obrigado pelo contato. Responderemos em breve!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto *
                      </label>
                      <select
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="pedido">Dúvidas sobre Pedido</option>
                        <option value="produto">Informações sobre Produtos</option>
                        <option value="entrega">Entrega</option>
                        <option value="sugestao">Sugestões</option>
                        <option value="reclamacao">Reclamação</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        placeholder="Escreva sua mensagem aqui..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Enviar Mensagem
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Perguntas Frequentes
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  📦 Como funciona a entrega?
                </h3>
                <p className="text-gray-600">
                  Entregamos em toda Londres e arredores. O prazo é de 2-5 dias úteis 
                  e você pode acompanhar seu pedido em tempo real.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  💳 Quais formas de pagamento aceitam?
                </h3>
                <p className="text-gray-600">
                  Aceitamos cartões de crédito/débito, PayPal, transferência bancária 
                  e PIX para clientes do Brasil.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  🔄 Posso trocar ou devolver produtos?
                </h3>
                <p className="text-gray-600">
                  Sim! Você tem até 14 dias para trocar ou devolver produtos, 
                  desde que estejam em perfeito estado.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  🇧🇷 Vocês falam português?
                </h3>
                <p className="text-gray-600">
                  Sim! Toda nossa equipe fala português fluentemente. 
                  Atendemos brasileiros em Londres com todo carinho!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
