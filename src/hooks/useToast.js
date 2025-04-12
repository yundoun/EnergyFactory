// src/hooks/useToast.js
import { useState, useCallback } from 'react';

// 토스트 메시지를 위한 고유 ID 생성 함수
let toastId = 0;
const generateId = () => {
  return (toastId++).toString();
};

export function useToast() {
  const [toasts, setToasts] = useState([]);

  // 토스트 추가 함수
  const toast = useCallback(({ title, description, type = 'default', duration = 5000 }) => {
    const id = generateId();

    const newToast = {
      id,
      title,
      description,
      type,
    };

    setToasts((currentToasts) => [...currentToasts, newToast]);

    // 지정된 시간 후 토스트 자동 제거
    if (duration !== Infinity) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  }, []);

  // 토스트 제거 함수
  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  // 모든 토스트 제거 함수
  const dismissAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toast,
    dismissToast,
    dismissAllToasts,
    toasts,
  };
}