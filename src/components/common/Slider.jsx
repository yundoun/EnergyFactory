// src/components/common/Slider.jsx
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [0],
  value,
  onValueChange,
  className,
  disabled = false,
  ...props
}) => {
  // 내부 상태 또는 제어된 값 사용
  const [internalValue, setInternalValue] = useState(value || defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const activeThumbIndex = useRef(0);

  // 값이 범위 내에 있도록 확인
  const clamp = (val) => Math.min(Math.max(val, min), max);

  // 위치에서 값으로 변환
  const getValueFromPosition = (position) => {
    if (!trackRef.current) return min;

    const trackRect = trackRef.current.getBoundingClientRect();
    const trackLength = trackRect.width;

    // 트랙에서의 백분율 계산
    const percentage = (position - trackRect.left) / trackLength;

    // 백분율을 값으로 변환
    const rawValue = min + percentage * (max - min);

    // 스텝에 맞게 조정
    const steppedValue = Math.round(rawValue / step) * step;

    return clamp(steppedValue);
  };

  // 노브 이벤트 핸들러
  const handleMouseDown = (event, index) => {
    if (disabled) return;

    event.preventDefault();
    activeThumbIndex.current = index;
    isDragging.current = true;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;

    const newValue = [...currentValue];
    newValue[activeThumbIndex.current] = getValueFromPosition(event.clientX);

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchMove = (event) => {
    if (!isDragging.current) return;

    const newValue = [...currentValue];
    newValue[activeThumbIndex.current] = getValueFromPosition(
      event.touches[0].clientX
    );

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  // 트랙 클릭 핸들러
  const handleTrackClick = (event) => {
    if (disabled) return;

    const newValue = [...currentValue];
    newValue[0] = getValueFromPosition(event.clientX);

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  // 요소 정리
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // 각 노브의 위치를 계산
  const getThumbPosition = (value) => {
    return ((value - min) / (max - min)) * 100;
  };

  // 레인지 폭 계산 (2개의 노브가 있을 경우)
  const getRangeWidth = () => {
    if (currentValue.length === 1) {
      return getThumbPosition(currentValue[0]);
    } else if (currentValue.length === 2) {
      return (
        getThumbPosition(currentValue[1]) - getThumbPosition(currentValue[0])
      );
    }
    return 0;
  };

  // 레인지 위치 계산 (2개의 노브가 있을 경우)
  const getRangeLeft = () => {
    if (currentValue.length === 2) {
      return getThumbPosition(currentValue[0]);
    }
    return 0;
  };

  return (
    <div
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}>
      <div
        ref={trackRef}
        className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
        onClick={handleTrackClick}>
        <div
          className="absolute h-full bg-primary"
          style={{
            left: `${currentValue.length === 2 ? getRangeLeft() : 0}%`,
            width: `${
              currentValue.length === 2
                ? getRangeWidth()
                : getThumbPosition(currentValue[0])
            }%`,
          }}
        />
      </div>

      {currentValue.map((val, index) => (
        <div
          key={index}
          className={cn(
            'absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          style={{
            left: `calc(${getThumbPosition(val)}% - 10px)`,
          }}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onTouchStart={(e) => handleMouseDown(e, index)}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          data-disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Slider;
