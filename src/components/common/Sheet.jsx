import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

// Sheet 컴포넌트
export const Sheet = ({
  children,
  isOpen,
  onClose,
  position = 'right',
  className,
}) => {
  const sheetRef = useRef(null);

  // 외부 클릭 감지 처리
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // ESC 키 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        ref={sheetRef}
        className={cn(
          'fixed z-50 bg-background shadow-lg transition-all duration-200',
          position === 'right' &&
            'right-0 top-0 h-full w-[75%] max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
          position === 'left' &&
            'left-0 top-0 h-full w-[75%] max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
          position === 'top' &&
            'left-0 right-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
          position === 'bottom' &&
            'bottom-0 left-0 right-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
          className
        )}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

// Sheet 하위 컴포넌트들
export const SheetTrigger = ({ children, onClick }) => {
  return <div onClick={onClick}>{children}</div>;
};

export const SheetContent = ({ children, className }) => {
  return (
    <div className={cn('p-6 h-full overflow-y-auto', className)}>
      {children}
    </div>
  );
};

export const SheetHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className
      )}>
      {children}
    </div>
  );
};

export const SheetFooter = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}>
      {children}
    </div>
  );
};

export const SheetTitle = ({ children, className }) => {
  return <h3 className={cn('text-lg font-semibold', className)}>{children}</h3>;
};

export const SheetDescription = ({ children, className }) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
  );
};
