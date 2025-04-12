import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const Accordion = ({ children, type = 'single', className, ...props }) => {
  return (
    <div className={cn('w-full', className)} {...props} data-type={type}>
      {children}
    </div>
  );
};

const AccordionItem = ({ children, value, className, ...props }) => {
  return (
    <div className={cn('border-b', className)} data-value={value} {...props}>
      {children}
    </div>
  );
};

const AccordionTrigger = ({ children, className, open, onClick, ...props }) => {
  return (
    <div className="flex" {...props}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline',
          className
        )}
        aria-expanded={open}>
        {children}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
    </div>
  );
};

const AccordionContent = ({ children, className, open, ...props }) => {
  return (
    <div
      className={cn(
        'overflow-hidden text-sm transition-all',
        open ? 'animate-accordion-down' : 'animate-accordion-up',
        className
      )}
      {...props}>
      {open && <div className="pb-4 pt-0">{children}</div>}
    </div>
  );
};

// 상태 관리를 위한 래퍼 컴포넌트
const AccordionRoot = ({
  children,
  defaultValue,
  type = 'single',
  className,
  ...props
}) => {
  const [openItems, setOpenItems] = useState(
    defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : []
  );

  const handleItemClick = (value) => {
    if (type === 'single') {
      setOpenItems(openItems[0] === value ? [] : [value]);
    } else {
      setOpenItems(
        openItems.includes(value)
          ? openItems.filter((item) => item !== value)
          : [...openItems, value]
      );
    }
  };

  // 자식 요소에 열림/닫힘 상태 및 클릭 핸들러 주입
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === AccordionItem) {
      const value = child.props.value;
      const isOpen = openItems.includes(value);

      // AccordionItem의 자식 요소들에게 상태 전달
      const nestedChildren = React.Children.map(
        child.props.children,
        (nestedChild) => {
          if (React.isValidElement(nestedChild)) {
            if (nestedChild.type === AccordionTrigger) {
              return React.cloneElement(nestedChild, {
                open: isOpen,
                onClick: () => handleItemClick(value),
              });
            }
            if (nestedChild.type === AccordionContent) {
              return React.cloneElement(nestedChild, {
                open: isOpen,
              });
            }
          }
          return nestedChild;
        }
      );

      return React.cloneElement(child, {}, nestedChildren);
    }
    return child;
  });

  return (
    <Accordion type={type} className={className} {...props}>
      {childrenWithProps}
    </Accordion>
  );
};

export {
  Accordion,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
