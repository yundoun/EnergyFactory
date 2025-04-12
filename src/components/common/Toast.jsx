// src/components/common/Toast.jsx
import { createContext, useContext } from 'react';
import { useToast } from '../../hooks/useToast';
import { X } from 'lucide-react';

// Toast 컨텍스트 생성
const ToastContext = createContext({});

// 컨텍스트 접근 훅
export const useToastContext = () => useContext(ToastContext);

// Toast 프로바이더 컴포넌트
export const ToastProvider = ({ children }) => {
  const { toast, dismissToast, dismissAllToasts, toasts } = useToast();

  return (
    <ToastContext.Provider value={{ toast, dismissToast, dismissAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </ToastContext.Provider>
  );
};

// 토스트 컨테이너 컴포넌트
const ToastContainer = ({ toasts, dismissToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-0 top-0 z-50 flex flex-col items-end p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={() => dismissToast(toast.id)}
        />
      ))}
    </div>
  );
};

// 개별 토스트 컴포넌트
const Toast = ({ toast, onDismiss }) => {
  const { id, title, description, type } = toast;

  // 토스트 타입에 따른 스타일 클래스
  const typeClasses = {
    default: 'bg-background border',
    success:
      'bg-green-100 border-green-500 dark:bg-green-800 dark:border-green-600',
    error: 'bg-red-100 border-red-500 dark:bg-red-800 dark:border-red-600',
    warning:
      'bg-yellow-100 border-yellow-500 dark:bg-yellow-800 dark:border-yellow-600',
    info: 'bg-blue-100 border-blue-500 dark:bg-blue-800 dark:border-blue-600',
  };

  return (
    <div
      className={`rounded-md shadow-lg border p-4 min-w-[300px] max-w-md animate-in slide-in-from-right-full ${
        typeClasses[type] || typeClasses.default
      }`}
      role="alert">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {title && <h3 className="font-medium text-sm">{title}</h3>}
          {description && (
            <div className="text-sm mt-1 text-muted-foreground">
              {description}
            </div>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="ml-4 inline-flex shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
