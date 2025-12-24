'use client'
import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterBanner({ lang = 'pt' }) {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    pt: {
      title: 'Assine Nossa Newsletter',
      description: 'Receba ofertas exclusivas de produtos portugueses e brasileiros direto no seu email.',
      placeholder: 'Seu melhor email',
      button: 'Inscrever-se',
      privacy: 'Respeitamos sua privacidade. Se não quiser receber nossos emails, clique em',
      unsubscribe: 'cancelar inscrição',
      success: '✓ Obrigado! Sua inscrição foi realizada com sucesso!',
      error: 'Por favor, insira um email válido.'
    },
    en: {
      title: 'Subscribe to Our Newsletter',
      description: 'Receive exclusive offers on Portuguese and Brazilian products directly in your email.',
      placeholder: 'Your best email',
      button: 'Sign Up',
      privacy: 'We respect your privacy. If you don\'t want to receive our emails, click',
      unsubscribe: 'unsubscribe',
      success: '✓ Thank you! Your subscription was successful!',
      error: 'Please enter a valid email.'
    }
  };

  const t = translations[lang] || translations.pt;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert(t.error);
      return;
    }

    setIsLoading(true);

    try {
      // Aqui você pode integrar com Supabase ou sua API
      // Exemplo:
      // const { error } = await supabase
      //   .from('newsletter_subscribers')
      //   .insert([{ email, subscribed_at: new Date() }]);
      // if (error) throw error;

      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Erro ao inscrever:', error);
      alert('Erro ao processar inscrição. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            {/* Ícone */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
            </div>

            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.title}
            </h2>

            {/* Descrição */}
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              {t.description}
            </p>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {t.button}
                      <Mail className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Mensagem de Sucesso */}
            {showSuccess && (
              <div className="max-w-xl mx-auto mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center justify-center gap-3 animate-fadeIn">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{t.success}</span>
              </div>
            )}

            {/* Texto de Privacidade */}
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              {t.privacy}{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Funcionalidade de cancelamento em desenvolvimento');
                }}
                className="text-green-600 hover:text-green-700 font-medium underline"
              >
                {t.unsubscribe}
              </a>
              .
            </p>
          </div>

          {/* Decoração com linha verde */}
          <div className="h-2 bg-gradient-to-r from-green-400 via-green-600 to-green-400"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
