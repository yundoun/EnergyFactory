// src/components/common/RadioGroup.jsx
import { createContext, useContext, useId } from 'react';
import Label from './Label';

const RadioGroupContext = createContext(null);

export function RadioGroup({
  value,
  onValueChange,
  defaultValue,
  children,
  className = '',
  ...props
}) {
  const id = useId();

  return (
    <RadioGroupContext.Provider
      value={{
        name: id,
        value,
        onValueChange: (newValue) => onValueChange(newValue),
        defaultValue,
      }}>
      <div className={`grid gap-2 ${className}`} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export function RadioGroupItem({
  value,
  id,
  className = '',
  children,
  ...props
}) {
  const context = useContext(RadioGroupContext);
  const itemId = id || `${context.name}-${value}`;
  const checked = context.value === value;

  return (
    <div className={className}>
      <input
        type="radio"
        id={itemId}
        name={context.name}
        value={value}
        checked={checked}
        onChange={() => context.onValueChange(value)}
        className="peer sr-only"
        {...props}
      />
      {children}
    </div>
  );
}

export default RadioGroup;
