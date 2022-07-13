import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  CSSProperties,
} from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import {
  format,
  isToday,
  isEqual,
  isBefore,
  isAfter,
  getWeeksInMonth,
  differenceInYears,
  differenceInMonths,
} from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import { v4 } from 'uuid';

import { DateHelper, IDate, IMonth, IYear } from '@helpers/DateHelper';

import { CalendarOptionsStyles } from './styles';

interface ICalendarOptionsProps {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDates: Date[];
  isComparing: boolean;
  minDate?: Date;
  maxDate?: Date;
  onSelect: (day: Date[], infoLabel: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export interface ICalendarOptionsRef {
  localize: () => void;
  clear: () => void;
}

const CalendarOptions: React.ForwardRefRenderFunction<
  ICalendarOptionsRef,
  ICalendarOptionsProps
> = (
  {
    startDate,
    setStartDate,
    selectedDates,
    isComparing,
    minDate = new Date(2000, 1, 1),
    maxDate = new Date(2050, 1, 1),
    onSelect,
    onPrev,
    onNext,
  },
  ref,
) => {
  const monthsScrollRef = useRef<any>(null);
  const yearsScrollRef = useRef<any>(null);

  const inputFromStartRef = useRef<HTMLInputElement>(null);
  const inputFromEndRef = useRef<HTMLInputElement>(null);
  const inputToStartRef = useRef<HTMLInputElement>(null);
  const inputToEndRef = useRef<HTMLInputElement>(null);

  const [months] = useState<IMonth[]>(
    DateHelper.getMonths(minDate, differenceInMonths(maxDate, minDate)),
  );

  const [years] = useState<IYear[]>(() => {
    return DateHelper.getYears(minDate, differenceInYears(maxDate, minDate));
  });

  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [firstHoveredDate, setFirstHoveredDate] = useState<Date>();
  const [secondHoveredDate, setSecondHoveredDate] = useState<Date>();

  const header = useMemo(
    () => ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
    [],
  );

  const onClick = useCallback(
    (day: IDate) => {
      setFirstHoveredDate(undefined);
      setSecondHoveredDate(undefined);

      if (selectedDates.length === 1) {
        onSelect([selectedDates[0], day.date], '');

        if (inputFromEndRef.current) {
          inputFromEndRef.current.value = format(day.date, 'yyyy-MM-dd');
        }
      } else if (selectedDates.length === 2 && isComparing) {
        onSelect([selectedDates[0], selectedDates[1], day.date], '');

        if (inputToStartRef.current) {
          inputToStartRef.current.value = format(day.date, 'yyyy-MM-dd');
        }
      } else if (selectedDates.length === 3 && isComparing) {
        onSelect(
          [selectedDates[0], selectedDates[1], selectedDates[2], day.date],
          '',
        );

        if (inputToEndRef.current) {
          inputToEndRef.current.value = format(day.date, 'yyyy-MM-dd');
        }
      } else {
        onSelect([day.date], '');

        if (inputFromStartRef.current) {
          inputFromStartRef.current.value = format(day.date, 'yyyy-MM-dd');
        }
      }
    },
    [isComparing, onSelect, selectedDates],
  );

  const getIsSelected = useCallback(
    ({ date }: IDate) => {
      if (selectedDates.length === 0) return false;

      if (selectedDates.length === 1) return isEqual(date, selectedDates[0]);

      if (selectedDates.length === 2) {
        return (
          isEqual(date, selectedDates[0]) || isEqual(date, selectedDates[1])
        );
      }

      if (selectedDates.length === 3) {
        return (
          isEqual(date, selectedDates[0]) ||
          isEqual(date, selectedDates[1]) ||
          isEqual(date, selectedDates[2])
        );
      }

      if (selectedDates.length === 4) {
        return (
          isEqual(date, selectedDates[0]) ||
          isEqual(date, selectedDates[1]) ||
          isEqual(date, selectedDates[2]) ||
          isEqual(date, selectedDates[3])
        );
      }

      return false;
    },
    [selectedDates],
  );

  const getIsHovered = useCallback(
    ({ date }: IDate) => {
      if (selectedDates.length === 0) return false;

      if (firstHoveredDate && selectedDates.length === 1) {
        return (
          isAfter(date, selectedDates[0]) && isBefore(date, firstHoveredDate)
        );
      }

      if (secondHoveredDate && selectedDates.length === 3) {
        const first =
          isAfter(date, selectedDates[0]) && isBefore(date, selectedDates[1]);

        const second =
          isAfter(date, selectedDates[2]) && isBefore(date, secondHoveredDate);

        return first || second;
      }

      const first =
        isAfter(date, selectedDates[0]) && isBefore(date, selectedDates[1]);

      const second =
        isAfter(date, selectedDates[2]) && isBefore(date, selectedDates[3]);

      return first || second;
    },
    [firstHoveredDate, secondHoveredDate, selectedDates],
  );

  const getProps = useCallback(
    (index: number, day: IDate) => {
      const on = day.isShow
        ? {
            onClick: () => onClick(day),
            onMouseEnter: () => {
              if (selectedDates.length > 0 && selectedDates.length < 2) {
                setFirstHoveredDate(day.date);
              }

              if (selectedDates.length > 2 && selectedDates.length < 4) {
                setSecondHoveredDate(day.date);
              }
            },
          }
        : {};

      const hoverColor =
        selectedDates.length === 0 || selectedDates.length < 2
          ? '#176BF8'
          : day.date >= selectedDates[0] && day.date <= selectedDates[1]
          ? '#176BF8'
          : '#F92F7A';

      return {
        key: v4(),
        index,
        day,
        hoverColor: isComparing ? hoverColor : '#176BF8',
        ...on,
        isToday: isToday(day.date),
        isSelected: getIsSelected(day),
        isHovered: getIsHovered(day),
      };
    },
    [getIsHovered, getIsSelected, isComparing, onClick, selectedDates],
  );

  const localize = useCallback(() => {
    if (isSelecting) {
      if (yearsScrollRef.current) {
        const index = years.findIndex(
          ({ date }) => date.getFullYear() === startDate.getFullYear(),
        );

        yearsScrollRef.current.scrollToItem(index, 'start');
      }
    }

    if (!isSelecting) {
      if (monthsScrollRef.current) {
        const index = months.findIndex(({ date }) => isEqual(date, startDate));

        monthsScrollRef.current.scrollToItem(index, 'start');
      }
    }
  }, [isSelecting, months, startDate, years]);

  const clear = useCallback(() => {
    if (inputFromStartRef.current) inputFromStartRef.current.value = '';
    if (inputFromEndRef.current) inputFromEndRef.current.value = '';
    if (inputToStartRef.current) inputToStartRef.current.value = '';
    if (inputToEndRef.current) inputToEndRef.current.value = '';

    setIsSelecting(false);
    setStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  }, [setStartDate]);

  useImperativeHandle(ref, () => ({ localize, clear }), [localize, clear]);

  useEffect(() => localize(), [localize]);

  return (
    <CalendarOptionsStyles.Container>
      <CalendarOptionsStyles.Options>
        <CalendarOptionsStyles.Comparer
          style={{ gap: isComparing ? '8px' : '0' }}
        >
          <CalendarOptionsStyles.Inputs
            isComparing={isComparing}
            color="#176BF8"
          >
            <input
              ref={inputFromStartRef}
              type="date"
              onChange={e =>
                onSelect([new Date(`${e.target.value}T00:00:00`)], '')
              }
            />
            -
            <input
              ref={inputFromEndRef}
              type="date"
              disabled={selectedDates.length === 0}
              onChange={e =>
                onSelect(
                  [selectedDates[0], new Date(`${e.target.value}T00:00:00`)],
                  '',
                )
              }
            />
          </CalendarOptionsStyles.Inputs>

          <CalendarOptionsStyles.InputsComparer isComparing={isComparing}>
            <CalendarOptionsStyles.Inputs
              isComparing={isComparing}
              color="#F92F7A"
            >
              <input
                ref={inputToStartRef}
                type="date"
                disabled={selectedDates.length <= 1}
                onChange={e =>
                  onSelect(
                    [
                      selectedDates[0],
                      selectedDates[1],
                      new Date(`${e.target.value}T00:00:00`),
                    ],
                    '',
                  )
                }
              />
              -
              <input
                ref={inputToEndRef}
                type="date"
                disabled={selectedDates.length <= 2}
                onChange={e =>
                  onSelect(
                    [
                      selectedDates[0],
                      selectedDates[1],
                      selectedDates[2],
                      new Date(`${e.target.value}T00:00:00`),
                    ],
                    '',
                  )
                }
              />
            </CalendarOptionsStyles.Inputs>
          </CalendarOptionsStyles.InputsComparer>
        </CalendarOptionsStyles.Comparer>

        <CalendarOptionsStyles.Selectors>
          <button
            type="button"
            onClick={() => setIsSelecting(!isSelecting)}
            style={{ color: isSelecting ? '#176BF8' : '#f6f7f9' }}
          >
            {format(startDate, 'MMMM yyyy', { locale })}

            <CalendarOptionsStyles.Arrow isSelecting={isSelecting} />
          </button>

          <div>
            <button type="button" onClick={onPrev}>
              <FiChevronLeft
                size={32}
                color="#f6f7f9"
                style={{ marginRight: '3px' }}
              />
            </button>

            <button type="button" onClick={onNext}>
              <FiChevronRight
                size={32}
                color="#f6f7f9"
                style={{ marginLeft: '3px' }}
              />
            </button>
          </div>
        </CalendarOptionsStyles.Selectors>

        <CalendarOptionsStyles.Header>
          {header.map(item => {
            return <span key={v4()}>{item}</span>;
          })}
        </CalendarOptionsStyles.Header>
      </CalendarOptionsStyles.Options>

      <CalendarOptionsStyles.Months
        ref={monthsScrollRef}
        itemData={months}
        itemCount={months.length}
        itemSize={264}
        height={isComparing ? 269 : 316}
        width={336}
        isSelecting={isSelecting}
      >
        {({ index, style }) => {
          const monthQuantity = getWeeksInMonth(months[index].date);

          return (
            <CalendarOptionsStyles.Month
              key={v4()}
              style={style}
              monthQuantity={monthQuantity}
            >
              <span>{months[index].label}</span>

              <CalendarOptionsStyles.Days>
                {months[index].days.map((day, dayIndex) => {
                  return (
                    <CalendarOptionsStyles.Day
                      {...getProps(dayIndex, day)}
                      type="button"
                    >
                      <span>{day.date.getDate()}</span>
                    </CalendarOptionsStyles.Day>
                  );
                })}
              </CalendarOptionsStyles.Days>
            </CalendarOptionsStyles.Month>
          );
        }}
      </CalendarOptionsStyles.Months>

      <CalendarOptionsStyles.Years
        ref={yearsScrollRef}
        itemData={years}
        itemCount={years.length}
        itemSize={164}
        height={isComparing ? 269 : 316}
        width={336}
        isSelecting={isSelecting}
      >
        {({ index, style }) => {
          return (
            <div key={v4()} style={style}>
              <CalendarOptionsStyles.Year>
                <strong>{years[index].label}</strong>

                <div>
                  {years[index].months.map(monthDate => {
                    const selectionIsEqualItem = isEqual(startDate, monthDate);
                    const todayDate = DateHelper.getToday();
                    const today = {
                      year: todayDate.getFullYear(),
                      month: todayDate.getMonth(),
                    };
                    const thisDate = new Date(today.year, today.month);
                    const thisDateEqualItem = isEqual(monthDate, thisDate);

                    const styles: CSSProperties = {
                      background: selectionIsEqualItem
                        ? '#176BF8'
                        : 'transparent',
                      color: selectionIsEqualItem
                        ? '#f6f7f9'
                        : thisDateEqualItem
                        ? '#176BF8'
                        : '#f6f7f9',
                      fontWeight: selectionIsEqualItem
                        ? 'bold'
                        : thisDateEqualItem
                        ? 'bold'
                        : 'normal',
                    };

                    return (
                      <button
                        key={v4()}
                        type="button"
                        onClick={() => setStartDate(monthDate)}
                        style={styles}
                      >
                        {format(monthDate, 'MMM.', { locale })}
                      </button>
                    );
                  })}
                </div>
              </CalendarOptionsStyles.Year>
            </div>
          );
        }}
      </CalendarOptionsStyles.Years>

      {/* <CalendarOptionsStyles.Months>
        {months.map(month => {
          return (
            <CalendarOptionsStyles.Month key={v4()}>
              <span>{month.label}</span>

              <CalendarOptionsStyles.Days>
                {month.days.map((day, index) => {
                  return (
                    <CalendarOptionsStyles.Day
                      {...getProps(index, day)}
                      type="button"
                    >
                      <span>{day.date.getDate()}</span>
                    </CalendarOptionsStyles.Day>
                  );
                })}
              </CalendarOptionsStyles.Days>
            </CalendarOptionsStyles.Month>
          );
        })}
      </CalendarOptionsStyles.Months> */}
    </CalendarOptionsStyles.Container>
  );
};

const Component = React.forwardRef(CalendarOptions);

export { Component as CalendarOptions };
