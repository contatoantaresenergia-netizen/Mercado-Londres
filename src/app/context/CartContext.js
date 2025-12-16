'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1. useEffect para CARREGAR o carrinho do localStorage (roda apenas na montagem)
  useEffect(() => {
    // Verifica se estamos no ambiente do navegador (browser)
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        // Garante que o item é JSON válido antes de definir o estado
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Erro ao carregar carrinho do localStorage:", e);
          localStorage.removeItem('cart'); // Limpa dados corrompidos
        }
      }
    }
  }, []);

  // 2. useEffect para SALVAR o carrinho no localStorage (roda toda vez que 'cart' muda)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        // Se o carrinho estiver vazio, garante que o item seja removido
        localStorage.removeItem('cart');
      }
    }
  }, [cart]);

  // FUNÇÃO CORRIGIDA PARA QUANTIDADE
  const addToCart = (product, quantity = 1) => { 
    // Garante que a quantidade seja um número inteiro positivo
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1); 

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Se o item existe, some a nova quantidade (qtyToAdd) à quantidade atual
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      
      // Se o item não existe, adicione o produto com a quantidade (qtyToAdd)
      return [...prevCart, { ...product, quantity: qtyToAdd }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
