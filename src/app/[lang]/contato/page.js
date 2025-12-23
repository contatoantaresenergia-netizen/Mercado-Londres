'use client'

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ContatoPage() {
  const params = useParams();
  const lang = params.lang || 'pt';

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const translations = {
    pt: {
      title: 'Entre em Contato',
      subtitle: 'Estamos aqui para ajudar! Fale conosco em português 🇧🇷',
      infoTitle: 'Nossas Informações',
      phone: {
        title: 'Telefone',
        available: 'WhatsApp disponível'
      },
      email: {
        title: 'Email',
        response: 'Respondemos em até 24h'
      },
      address: {
        title: 'Endereço'
      },
      hours: {
        title: 'Horário de Atendimento',
        weekdays: 'Segunda a Sexta: 9h - 18h',
        saturday: 'Sábado: 10h - 16h',
        sunday: 'Domingo: Fechado'
      },
      form: {
        title: 'Envie uma Mensagem',
        name: 'Nome Completo',
        namePlaceholder: 'Seu nome',
        emailLabel: 'Email',
        emailPlaceholder: 'seu@email.com',
        subject: 'Assunto',
        subjectPlaceholder: 'Selecione um assunto',
        subjects: {
          order: 'Dúvidas sobre Pedido',
          product: 'Informações sobre Produtos',
          delivery: 'Entrega',
          suggestion: 'Sugestões',
          complaint: 'Reclamação',
          other: 'Outro'
        },
        message: 'Mensagem',
        messagePlaceholder: 'Escreva sua mensagem aqui...',
        submit: 'Enviar Mensagem',
        successTitle: 'Mensagem Enviada! ✉️',
        successMessage: 'Obrigado pelo contato. Responderemos em breve!'
      },
      faq: {
        title: 'Perguntas Frequentes',
        q1: {
          question: '📦 Como funciona a entrega?',
          answer: 'Entregamos em toda Londres e arredores. O prazo é de 2-5 dias úteis e você pode acompanhar seu pedido em tempo real.'
        },
        q2: {
          question: '💳 Quais formas de pagamento aceitam?',
          answer: 'Aceitamos cartões de crédito/débito, PayPal, transferência bancária e PIX para clientes do Brasil.'
        },
        q3: {
          question: '🔄 Posso trocar ou devolver produtos?',
          answer: 'Sim! Você tem até 14 dias para trocar ou devolver produtos, desde que estejam em perfeito estado.'
        },
        q4: {
          question: '🇧🇷 Vocês falam português?',
          answer: 'Sim! Toda nossa equipe fala português fluentemente. Atendemos brasileiros em Londres com todo carinho!'
        }
      }
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to help! Talk to us in English 🇬🇧',
      infoTitle: 'Our Information',
      phone: {
        title: 'Phone',
        available: 'WhatsApp available'
      },
      email: {
        title: 'Email',
        response: 'We respond within 24h'
      },
      address: {
        title: 'Address'
      },
      hours: {
        title: 'Opening Hours',
        weekdays: 'Monday to Friday: 9am - 6pm',
        saturday: 'Saturday: 10am - 4pm',
        sunday: 'Sunday: Closed'
      },
      form: {
        title: 'Send a Message',
        name: 'Full Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        subject: 'Subject',
        subjectPlaceholder: 'Select a subject',
        subjects: {
          order: 'Order Questions',
          product: 'Product Information',
          delivery: 'Delivery',
          suggestion: 'Suggestions',
          complaint: 'Complaint',
          other: 'Other'
        },
        message: 'Message',
        messagePlaceholder: 'Write your message here...',
        submit: 'Send Message',
        successTitle: 'Message Sent! ✉️',
        successMessage: 'Thank you for contacting us. We will respond shortly!'
      },
      faq: {
        title: 'Frequently Asked Questions',
        q1: {
          question: '📦 How does delivery work?',
          answer: 'We deliver across London and surrounding areas. Delivery takes 2-5 business days and you can track your order in real time.'
        },
        q2: {
          question: '💳 What payment methods do you accept?',
          answer: 'We accept credit/debit cards, PayPal, bank transfer and PIX for customers in Brazil.'
        },
        q3: {
          question: '🔄 Can I exchange or return products?',
          answer: 'Yes! You have up to 14 days to exchange or return products, as long as they are in perfect condition.'
        },
        q4: {
          question: '🇧🇷 Do you speak Portuguese?',
          answer: 'Yes! Our entire team speaks Portuguese fluently. We serve Brazilians in London with care!'
        }
      }
    }
  };

  const t = translations[lang] || translations.pt;

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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {t.infoTitle}
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {t.phone.title}
                    </h3>
                    <p className="text-gray-600">+44 78 60280496</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {t.phone.available}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {t.email.title}
                    </h3>
                    <p className="text-gray-600">contato@mercadolondres.co.uk</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {t.email.response}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {t.address.title}
                    </h3>
                    <p className="text-gray-600">
                      244 Horton Road<br />
                      London, SL3 9HN<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {t.hours.title}
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p>{t.hours.weekdays}</p>
                      <p>{t.hours.saturday}</p>
                      <p>{t.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 bg-gray-200 rounded-lg h-64 overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.1106774!2d-0.241681!3d51.5287352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondres%2C%20Reino%20Unido!5e0!3m2!1spt-PT!2spt!4v1710000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {t.form.title}
                </h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {t.form.successTitle}
                    </h3>
                    <p className="text-gray-600">
                      {t.form.successMessage}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.name} *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                        placeholder={t.form.namePlaceholder}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.emailLabel} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                        placeholder={t.form.emailPlaceholder}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.subject} *
                      </label>
                      <select
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                      >
                        <option value="">{t.form.subjectPlaceholder}</option>
                        <option value="pedido">{t.form.subjects.order}</option>
                        <option value="produto">{t.form.subjects.product}</option>
                        <option value="entrega">{t.form.subjects.delivery}</option>
                        <option value="sugestao">{t.form.subjects.suggestion}</option>
                        <option value="reclamacao">{t.form.subjects.complaint}</option>
                        <option value="outro">{t.form.subjects.other}</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.message} *
                      </label>
                      <textarea
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none resize-none"
                        placeholder={t.form.messagePlaceholder}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                      {t.form.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              {t.faq.title}
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {t.faq.q1.question}
                </h3>
                <p className="text-gray-600">
                  {t.faq.q1.answer}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {t.faq.q2.question}
                </h3>
                <p className="text-gray-600">
                  {t.faq.q2.answer}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {t.faq.q3.question}
                </h3>
                <p className="text-gray-600">
                  {t.faq.q3.answer}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {t.faq.q4.question}
                </h3>
                <p className="text-gray-600">
                  {t.faq.q4.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
