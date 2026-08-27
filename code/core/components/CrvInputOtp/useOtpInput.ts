import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react';

function clampLength(length: number) {
  return Math.min(8, Math.max(4, length));
}

function toDigits(value: string, length: number) {
  const chars = value.replace(/\D/g, '').slice(0, length).split('');
  return Array.from({ length }, (_, index) => chars[index] ?? '');
}

function fromDigits(digits: string[]) {
  return digits.join('');
}

export function useOtpInput({
  length = 6,
  value: valueProp,
  defaultValue = '',
  disabled = false,
  onChange,
  onComplete,
}: {
  length?: number;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}) {
  const slotCount = clampLength(length);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [uncontrolledDigits, setUncontrolledDigits] = useState(() =>
    toDigits(defaultValue, slotCount),
  );

  const digits = valueProp !== undefined
    ? toDigits(valueProp, slotCount)
    : uncontrolledDigits;

  const emitChange = useCallback(
    (nextDigits: string[]) => {
      const nextValue = fromDigits(nextDigits);
      if (valueProp === undefined) setUncontrolledDigits(nextDigits);
      onChange?.(nextValue);
      if (nextValue.length === slotCount && !nextDigits.includes('')) {
        onComplete?.(nextValue);
      }
    },
    [onChange, onComplete, slotCount, valueProp],
  );

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, slotCount);
  }, [slotCount]);

  const focusSlot = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const handleSlotChange = (index: number, rawValue: string) => {
    if (disabled) return;

    const sanitized = rawValue.replace(/\D/g, '');
    const nextDigits = [...digits];

    if (sanitized.length > 1) {
      sanitized.slice(0, slotCount - index).split('').forEach((char, offset) => {
        nextDigits[index + offset] = char;
      });
      emitChange(nextDigits);
      const nextFocus = Math.min(index + sanitized.length, slotCount - 1);
      focusSlot(nextFocus);
      return;
    }

    nextDigits[index] = sanitized.slice(-1);
    emitChange(nextDigits);
    if (sanitized && index < slotCount - 1) focusSlot(index + 1);
  };

  const handleSlotKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (disabled) return;

    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault();
      focusSlot(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusSlot(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < slotCount - 1) {
      event.preventDefault();
      focusSlot(index + 1);
    }
  };

  const handlePaste = (
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    if (disabled) return;

    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '');
    if (!pasted) return;

    const nextDigits = [...digits];
    pasted.slice(0, slotCount - index).split('').forEach((char, offset) => {
      nextDigits[index + offset] = char;
    });
    emitChange(nextDigits);
    focusSlot(Math.min(index + pasted.length, slotCount) - 1);
  };

  return {
    slotCount,
    digits,
    inputRefs,
    handleSlotChange,
    handleSlotKeyDown,
    handlePaste,
  };
}
