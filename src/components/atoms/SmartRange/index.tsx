import React, { useRef, useState, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { addMonths } from 'date-fns';

import { useClickAway } from '@hooks/useClickAway';

import { DateSelector } from './DateSelector';

import { Container, Arrow, Info, Actions } from './styles';

export type IValue = { original: Date[]; formatted: string; infoLabel: string };

interface ISmartRangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  language?: 'pt-BR' | 'en-US';
  variation?: 'rounded' | 'lined';
  minDate?: Date;
  maxDate?: Date;
  externalInteraction?: boolean;
  onApply: (selection: Date[]) => void;
}

const SmartRange: React.FC<ISmartRangeProps> = ({
  language = 'pt-BR',
  variation,
  placeholder,
  minDate,
  maxDate,
  externalInteraction,
  onApply,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<IValue>({
    original: [],
    formatted: '',
    infoLabel: '',
  });

  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  const onSelect = useCallback(
    (original: Date[], infoLabel: string) => {
      let formatted = '';

      if (original.length === 0) formatted = `Todo o período`;

      if (original.length === 1) {
        formatted = `${original[0].toLocaleDateString(language)}`;
      }

      if (original.length === 2) {
        const first = original[0].toLocaleDateString(language);
        const last = original[1].toLocaleDateString(language);

        formatted = `${first} - ${last}`;
      }

      if (original.length === 3) {
        const fromStartComparer = original[0].toLocaleDateString(language);
        const fromEndComparer = original[1].toLocaleDateString(language);
        const toStartComparer = original[2].toLocaleDateString(language);

        const from = `${fromStartComparer} - ${fromEndComparer}`;
        const to = `${toStartComparer}`;

        formatted = `${from} vs ${to}`;
      }

      if (original.length === 4) {
        const fromStartComparer = original[0].toLocaleDateString(language);
        const fromEndComparer = original[1].toLocaleDateString(language);
        const toStartComparer = original[2].toLocaleDateString(language);
        const toEndComparer = original[3].toLocaleDateString(language);

        const from = `${fromStartComparer} - ${fromEndComparer}`;
        const to = `${toStartComparer} - ${toEndComparer}`;

        formatted = `${from} vs ${to}`;
      }

      setValue({ original, formatted, infoLabel });

      if (inputRef.current) inputRef.current.setAttribute('value', formatted);
    },
    [language],
  );

  const handleCancel = useCallback(() => setIsFocused(false), []);

  const handleClear = useCallback(() => {
    setValue({ original: [], formatted: '', infoLabel: '' });
    if (inputRef.current) inputRef.current.setAttribute('value', '');
  }, []);

  const handleApply = useCallback(
    (selection: Date[], infoLabel: string) => {
      onApply(selection);
      setIsFocused(false);
      onSelect(selection, infoLabel);
    },
    [onApply, onSelect],
  );

  useClickAway(containerRef, () => setIsFocused(false), {
    enabled: isFocused,
  });

  return (
    <Container
      ref={containerRef}
      isFocused={isFocused}
      isComparing={isComparing}
      variation={variation}
      externalInteraction={externalInteraction}
      onFocus={() => setIsFocused(true)}
    >
      {externalInteraction && (
        <Info isComparing={isComparing}>
          <span>{value.infoLabel}</span>
        </Info>
      )}

      <input ref={inputRef} placeholder={placeholder} readOnly />

      <Arrow isFocused={isFocused} />

      {externalInteraction && (
        <Actions>
          <button
            type="button"
            disabled={value.original.length === 0}
            onClick={() => console.log('onPrev')}
          >
            <FiChevronLeft
              size={32}
              color="#f6f7f9"
              style={{ marginRight: '3px' }}
            />
          </button>

          <button
            type="button"
            disabled={value.original.length === 0}
            onClick={() => console.log('onNext')}
          >
            <FiChevronRight
              size={32}
              color="#f6f7f9"
              style={{ marginLeft: '3px' }}
            />
          </button>
        </Actions>
      )}

      <DateSelector
        startDate={startDate}
        setStartDate={setStartDate}
        isFocused={isFocused}
        isComparing={isComparing}
        setIsComparing={setIsComparing}
        minDate={minDate}
        maxDate={maxDate}
        onApply={handleApply}
        onCancel={handleCancel}
        onClear={handleClear}
        onSelect={onSelect}
        onPrev={() => setStartDate(state => addMonths(state, -1))}
        onNext={() => setStartDate(state => addMonths(state, +1))}
        value={value}
      />
    </Container>
  );
};

export { SmartRange };
