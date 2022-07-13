import React, { useRef, useState, useCallback } from 'react';

import { DateHelper } from '@helpers/DateHelper';

import { FilterOptionsStyles } from './styles';

interface IFilterOptionsProps {
  isComparing: boolean;
  setIsComparing: React.Dispatch<React.SetStateAction<boolean>>;
  onApply: (original: Date[], infoLabel: string) => void;
  onClearInputs: () => void;
}

const FilterOptions: React.FC<IFilterOptionsProps> = ({
  isComparing,
  setIsComparing,
  onApply,
  onClearInputs,
}) => {
  const switcherRef = useRef<HTMLInputElement>(null);

  const [thisWeekWorkingDays, setThisWeekWorkingDays] = useState<boolean>(true);
  const [lastWeekWorkingDays, setLastWeekWorkingDays] = useState<boolean>(true);

  const onApplyToday = useCallback(
    () => onApply([DateHelper.getToday()], 'Hoje'),
    [onApply],
  );

  const onApplyYesterday = useCallback(
    () => onApply([DateHelper.getYesterday()], 'Ontem'),
    [onApply],
  );

  const onApplyThisWeek = useCallback(
    () => onApply(DateHelper.getThisWeek(thisWeekWorkingDays), 'Esta Semana'),
    [onApply, thisWeekWorkingDays],
  );

  const onApplyLastSevenDays = useCallback(
    () => onApply(DateHelper.getLastSevenDays(), 'Últimos 7 dias'),
    [onApply],
  );

  const onApplyLastWeek = useCallback(
    () => onApply(DateHelper.getLastWeek(lastWeekWorkingDays), 'Última Semana'),
    [onApply, lastWeekWorkingDays],
  );

  const onApplyLastFourteenDays = useCallback(
    () => onApply(DateHelper.getLastFourteenDays(), 'Últimos 14 dias'),
    [onApply],
  );

  const onApplyThisMonth = useCallback(
    () => onApply(DateHelper.getThisMonth(), 'Este Mês'),
    [onApply],
  );

  const onApplyLastThirtyDays = useCallback(
    () => onApply(DateHelper.getLastThirtyDays(), 'Últimos 30 dias'),
    [onApply],
  );

  const onApplyLastMonth = useCallback(
    () => onApply(DateHelper.getLastMonth(), 'Último Mês'),
    [onApply],
  );

  const onApplyAllPeriod = useCallback(() => onApply([], ''), [onApply]);

  return (
    <FilterOptionsStyles.Container>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <FilterOptionsStyles.FilterOption type="button" onClick={onApplyToday}>
          Hoje
        </FilterOptionsStyles.FilterOption>

        <FilterOptionsStyles.FilterOption
          type="button"
          onClick={onApplyYesterday}
        >
          Ontem
        </FilterOptionsStyles.FilterOption>

        <div style={{ width: '100%', display: 'flex' }}>
          <FilterOptionsStyles.FilterOption
            type="button"
            onClick={onApplyThisWeek}
          >
            Esta semana
          </FilterOptionsStyles.FilterOption>

          <FilterOptionsStyles.FilterOption
            type="button"
            onClick={() => setThisWeekWorkingDays(!thisWeekWorkingDays)}
          >
            <span>{thisWeekWorkingDays ? '(Seg - Hoje)' : '(Sáb - Hoje)'}</span>
            <FilterOptionsStyles.FilterOptionArrow />
          </FilterOptionsStyles.FilterOption>
        </div>

        <FilterOptionsStyles.FilterOption
          type="button"
          onClick={onApplyLastSevenDays}
        >
          Últimos 7 dias
        </FilterOptionsStyles.FilterOption>

        <div style={{ width: '100%', display: 'flex' }}>
          <FilterOptionsStyles.FilterOption
            type="button"
            onClick={onApplyLastWeek}
          >
            Última semana
          </FilterOptionsStyles.FilterOption>

          <FilterOptionsStyles.FilterOption
            type="button"
            onClick={() => setLastWeekWorkingDays(!lastWeekWorkingDays)}
            style={{ width: '112px' }}
          >
            <span>{lastWeekWorkingDays ? '(Seg - Sáb)' : '(Sáb - Dom)'}</span>
            <FilterOptionsStyles.FilterOptionArrow />
          </FilterOptionsStyles.FilterOption>
        </div>

        <FilterOptionsStyles.FilterOption
          type="button"
          onClick={onApplyLastFourteenDays}
        >
          Últimos 14 dias
        </FilterOptionsStyles.FilterOption>

        <FilterOptionsStyles.FilterOption
          type="button"
          onClick={onApplyThisMonth}
        >
          Este mês
        </FilterOptionsStyles.FilterOption>

        <FilterOptionsStyles.FilterOption
          type="button"
          onClick={onApplyLastThirtyDays}
        >
          Últimos 30 dias
        </FilterOptionsStyles.FilterOption>

        <FilterOptionsStyles.FilterOption
          type="button"
          onClick={onApplyLastMonth}
        >
          Último mês
        </FilterOptionsStyles.FilterOption>

        <FilterOptionsStyles.FilterOption
          type="button"
          onClick={onApplyAllPeriod}
        >
          Todo o período
        </FilterOptionsStyles.FilterOption>
      </div>

      <FilterOptionsStyles.Comparer>
        <span>Comparar</span>

        <FilterOptionsStyles.Switcher
          isActive={isComparing}
          onClick={() => {
            onClearInputs();
            setIsComparing(!isComparing);
          }}
        >
          <FilterOptionsStyles.SwitcherBall isActive={isComparing} />

          <input
            ref={switcherRef}
            type="radio"
            checked={isComparing}
            onChange={() => setIsComparing(!isComparing)}
          />
        </FilterOptionsStyles.Switcher>
      </FilterOptionsStyles.Comparer>
    </FilterOptionsStyles.Container>
  );
};

export { FilterOptions };
