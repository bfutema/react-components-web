import React, { useRef, useCallback } from 'react';

import { IValue } from '..';

import { CalendarOptions, ICalendarOptionsRef } from './CalendarOptions';
import { FilterOptions } from './FilterOptions';

import { Container, Actions } from './styles';

interface IDateSelectorProps {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  isFocused: boolean;
  isComparing: boolean;
  setIsComparing: React.Dispatch<React.SetStateAction<boolean>>;
  minDate?: Date;
  maxDate?: Date;
  value: IValue;
  onApply: (original: Date[], infoLabel: string) => void;
  onCancel: () => void;
  onClear: () => void;
  onSelect: (original: Date[], infoLabel: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

const DateSelector: React.FC<IDateSelectorProps> = ({
  startDate,
  setStartDate,
  isFocused,
  isComparing,
  setIsComparing,
  minDate,
  maxDate,
  value,
  onApply,
  onCancel,
  onClear,
  onSelect,
  onPrev,
  onNext,
}) => {
  const calendarOptionsRef = useRef<ICalendarOptionsRef>(null);

  const handleClear = useCallback(() => {
    setIsComparing(false);
    onClear();
    calendarOptionsRef.current?.clear();
  }, [onClear, setIsComparing]);

  return (
    <Container isFocused={isFocused}>
      <div>
        <FilterOptions
          onApply={onApply}
          onClearInputs={handleClear}
          isComparing={isComparing}
          setIsComparing={setIsComparing}
        />

        <CalendarOptions
          ref={calendarOptionsRef}
          startDate={startDate}
          setStartDate={setStartDate}
          selectedDates={value.original}
          isComparing={isComparing}
          minDate={minDate}
          maxDate={maxDate}
          onSelect={onSelect}
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>

      <Actions>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>

        <button
          type="button"
          onClick={() => calendarOptionsRef.current?.localize()}
        >
          Localizar
        </button>

        <button type="button" onClick={handleClear}>
          Limpar
        </button>

        <button
          type="button"
          onClick={() => onApply(value.original, value.infoLabel)}
        >
          Aplicar
        </button>
      </Actions>
    </Container>
  );
};

export { DateSelector };
