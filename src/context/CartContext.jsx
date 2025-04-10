import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // 장바구니 상태 변경 시 계산 업데이트
  useEffect(() => {
    // 로컬 스토리지에서 장바구니 가져오기
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 장바구니 항목이 변경될 때마다 합계 업데이트
  useEffect(() => {
    calculateTotals();
    // 로컬 스토리지에 장바구니 저장
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 장바구니 합계 계산
  const calculateTotals = () => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    setTotalItems(itemCount);
    setSubtotal(cartSubtotal);
  };

  // 장바구니에 상품 추가
  const addToCart = (product, quantity = 1, variant = '', size = '') => {
    setCartItems(prevItems => {
      // 기존 장바구니에 상품이 있는지 확인
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.variant === variant && item.size === size
      );

      // 상품이 이미 있으면 수량 업데이트
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }

      // 상품이 없으면 새로 추가
      return [...prevItems, {
        ...product,
        quantity,
        variant,
        size
      }];
    });
  };

  // 장바구니에서 상품 제거
  const removeFromCart = (id, variant, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item =>
        !(item.id === id && item.variant === variant && item.size === size)
      )
    );
  };

  // 장바구니 상품 수량 업데이트
  const updateQuantity = (id, variant, size, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.id === id && item.variant === variant && item.size === size)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // 장바구니 비우기
  const clearCart = () => {
    setCartItems([]);
  };

  // 장바구니의 영양 요약 계산
  const calculateNutritionTotals = () => {
    return cartItems.reduce(
      (totals, item) => {
        return {
          calories: totals.calories + (item.nutrition?.calories || 0) * item.quantity,
          protein: totals.protein + (item.nutrition?.protein || 0) * item.quantity,
          carbs: totals.carbs + (item.nutrition?.carbs || 0) * item.quantity,
          fat: totals.fat + (item.nutrition?.fat || 0) * item.quantity,
        }
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalItems,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      calculateNutritionTotals
    }}>
      {children}
    </CartContext.Provider>
  );
};