import { FixedSizeList } from 'react-window';

import { isLastDayOfMonth } from 'date-fns';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

import { IDate } from '@helpers/DateHelper';

import { IFieldFeedback } from '../styles';

type IContainerProps = IFieldFeedback;

export const Container = styled.div<IContainerProps>`
  ${({ isFocused }) => css`
    width: 576px;
    height: 500px;

    border: 1px solid ${isFocused ? '#1b1c22' : 'transparent'};
    border: 1px solid ${isFocused ? '#176bf8' : 'transparent'};
    border-radius: 8px;
    background: #1b1c22;
    box-shadow: 0 0 24px #1b1c22;

    position: absolute;
    right: 0;
    top: calc(40px + 16px);

    display: flex;
    flex-direction: column;

    visibility: ${isFocused ? 'visible' : 'hidden'};
    opacity: ${isFocused ? 1 : 0};

    transition: all 400ms;

    z-index: 10;

    > div:nth-of-type(1) {
      flex: 1;
      display: flex;
    }

    * {
      pointer-events: ${isFocused ? 'initial' : 'none'};
    }
  `}
`;

export const Actions = styled.div`
  ${() => css`
    width: 100%;
    height: 40px;
    min-height: 40px;

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top: 1px solid #0f0f10;
    background: #1b1c22;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      height: 100%;

      border: none;
      background: #1b1c22;

      color: #f6f7f9;

      padding: 0 16px;

      transition: all 400ms;

      &:hover {
        background: ${transparentize(0.8, '#176bf8')};
      }

      &:last-child {
        border-bottom-right-radius: 8px;
      }
    }
  `}
`;

/**
 * Component: FilterOptions
 */
interface ISwitcherProps {
  isActive: boolean;
  staticColor?: boolean;
}

export const FilterOptionsStyles = {
  Container: styled.div`
    ${() => css`
      height: 458px;
      min-height: 458px;

      border-top-left-radius: 8px;
      border-right: 1px solid #0f0f10;
      background: #1b1c22;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `}
  `,
  FilterOption: styled.button`
    ${() => css`
      width: 100%;

      border: none;
      background: none;

      color: #f6f7f9;
      font-size: 14px;
      font-weight: normal;
      white-space: nowrap;

      padding: 10.49px 8px;

      gap: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:first-child {
        border-top-left-radius: 8px;
      }

      &:hover {
        background: ${transparentize(0.8, '#176bf8')};
      }

      span {
        color: #e3e9ec;
        font-size: 12px;
        white-space: nowrap;
      }
    `}
  `,
  FilterOptionArrow: styled.div`
    ${() => css`
      width: 0;
      height: 0;

      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 9px solid #176bf8;

      pointer-events: none;

      cursor: pointer;

      transform: rotate(90deg);
    `}
  `,
  Comparer: styled.div`
    ${() => css`
      width: 100%;

      border-top: 1px solid #0f0f10;

      color: #f6f7f9;
      font-size: 14px;
      font-weight: normal;

      padding: 8px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
  `,
  Switcher: styled.div<ISwitcherProps>`
    ${({ isActive }) => css`
      width: 32px;
      height: 10px;

      border-radius: 16px;
      background: ${isActive ? transparentize(0.8, '#176bf8') : '#0f0f10'};

      margin: 4px 0;
      padding: 4px;

      position: relative;

      display: flex;
      align-items: center;

      cursor: pointer;

      transition: all 400ms;

      input {
        display: none;
      }
    `}
  `,
  SwitcherBall: styled.div<ISwitcherProps>`
    ${({ isActive, staticColor }) => css`
      width: 14px;
      height: 14px;

      border-radius: 100%;

      position: absolute;

      transition: all 400ms;

      ${isActive ? ballVariations.active : ballVariations.inactive}

      ${staticColor &&
      css`
        background: #ffffff;
      `}
    `}
  `,
};

const ballVariations = {
  active: css`
    background: #176bf8;

    left: 18px;
  `,
  inactive: css`
    background: #ffffff;

    left: 0px;
  `,
};

/**
 * Component: CalendarOptions
 */
interface IInputsProps {
  isComparing: boolean;
  color: string;
}

interface IInputsComparerProps {
  isComparing: boolean;
}

interface ISelectionArrowProps {
  isSelecting: boolean;
}

interface IYearsProps {
  isSelecting: boolean;
}

interface IMonthsProps {
  isSelecting: boolean;
}

export interface IDayProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  key: string;
  hoverColor: string;
  index: number;
  day: IDate;
  isToday: boolean;
  isSelected: boolean;
  isHovered: boolean;
}

interface IMonthProps {
  monthQuantity: number;
}

export const CalendarOptionsStyles = {
  Container: styled.div`
    ${() => css`
      width: 100%;

      border-top-right-radius: 8px;
      background: #1b1c22;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `}
  `,
  Options: styled.div`
    ${() => css`
      width: 100%;

      border-bottom: 1px solid #0f0f10;
      border-top-right-radius: 8px;

      padding: 8px;

      gap: 16px;
      display: flex;
      flex-direction: column;
    `}
  `,
  Comparer: styled.div`
    gap: 8px;
    display: flex;
    flex-direction: column;
  `,
  Inputs: styled.div<IInputsProps>`
    ${({ isComparing, color }) => css`
      width: 100%;

      gap: 8px;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        height: 40px;

        border-radius: 4px;
        border: none;
        outline: none;
        border: 1px solid ${isComparing ? color : '#f6f7f9'};
        background: ${isComparing ? 'transparent' : '#f6f7f9'};

        color: ${isComparing ? '#f6f7f9' : '#1b1c22'};

        padding: 0 8px;

        cursor: pointer;

        &::-webkit-calendar-picker-indicator {
          filter: ${isComparing ? 'invert(1)' : 'initial'};

          cursor: pointer;
        }
      }
    `}
  `,
  InputsComparer: styled.div<IInputsComparerProps>`
    ${({ isComparing }) => css`
      height: ${isComparing ? '40px' : '0px'};
      visibility: ${isComparing ? 'visible' : 'hidden'};
      opacity: ${isComparing ? 1 : 0};
      transition: ${isComparing ? 'all 400ms' : 'all 0s'};
    `}
  `,
  Selectors: styled.div`
    ${() => css`
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        gap: 8px;
        display: flex;
        align-items: center;

        button {
          width: 34px;
          height: 34px;

          transition: all 400ms;

          &:hover {
            border: 1px solid #454545;
          }

          &:active {
            transform: scale(0.9);
          }
        }
      }

      button {
        height: 100%;

        border-radius: 50%;
        border: 1px solid transparent;
        background: none;

        color: #f6f7f9;
        text-transform: capitalize;

        gap: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}
  `,
  Arrow: styled.div<ISelectionArrowProps>`
    ${({ isSelecting }) => css`
      width: 0;
      height: 0;

      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid ${isSelecting ? '#176BF8' : '#f6f7f9'};
      border-radius: 2px;

      pointer-events: none;

      cursor: pointer;

      transform: rotate(0deg);
    `}
  `,
  Header: styled.div`
    ${() => css`
      padding: 0 16px 0 4px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        color: #f6f7f9;
        font-size: 12px;
      }
    `}
  `,
  Years: styled(FixedSizeList)<IYearsProps>`
    ${({ isSelecting }) => css`
      width: 100%;
      height: 100%;
      max-height: 316px;

      padding: 8px;

      overflow-y: scroll;
      scroll-behavior: smooth;

      opacity: ${isSelecting ? 1 : 0};
      visibility: ${isSelecting ? 'visible' : 'hidden'};
      display: ${isSelecting ? 'block' : 'none'};

      > div > div {
        padding: 8px;
      }

      &::-webkit-scrollbar {
        width: 6px;

        background: #0f0f10;
      }

      &::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0);
      }

      &::-webkit-scrollbar-track {
        border-radius: 7px;
      }

      &::-webkit-scrollbar-thumb {
        background: #176bf8;
        border-radius: 7px;
      }
    `}
  `,
  Year: styled.div`
    ${({ theme }) => css`
      height: 100%;

      border-radius: 8px;
      background: ${transparentize(0.8, theme.colors.background)};

      padding: 16px;

      gap: 12px;
      display: flex;
      flex-direction: column;

      div {
        row-gap: 6px;
        column-gap: 16px;
        flex: 1;
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        button {
          border-radius: 4px;
          border: 1px solid transparent;
          background: none;

          color: #f6f7f9;
          text-transform: uppercase;

          transition: all 400ms;

          &:hover {
            background: #176bf8 !important;

            color: #f6f7f9 !important;
          }
        }
      }
    `}
  `,
  Months: styled(FixedSizeList)<IMonthsProps>`
    ${({ isSelecting }) => css`
      width: 100%;
      height: 100%;
      max-height: 316px;

      padding: 8px;

      overflow-y: scroll;
      scroll-behavior: smooth;

      opacity: ${isSelecting ? 0 : 1};
      visibility: ${isSelecting ? 'hidden' : 'visible'};
      display: ${isSelecting ? 'none' : 'block'};

      > div > div {
        padding: 8px;
      }

      &::-webkit-scrollbar {
        width: 6px;

        background: #0f0f10;
      }

      &::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0);
      }

      &::-webkit-scrollbar-track {
        border-radius: 7px;
      }

      &::-webkit-scrollbar-thumb {
        background: #176bf8;
        border-radius: 7px;
      }
    `}
  `,
  Month: styled.div<IMonthProps>`
    ${({ monthQuantity }) => css`
      & + div {
        margin-top: ${monthQuantity < 6 ? '0' : '24px'};
      }

      > span {
        color: #f6f7f9;
        font-size: 14px;
        text-transform: capitalize;

        margin-bottom: 6px;

        display: block;
      }
    `}
  `,
  Days: styled.div`
    height: fit-content;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
  `,
  Day: styled.button<IDayProps>`
    ${({ index, day, hoverColor, isToday, isSelected, isHovered }) => css`
      width: 100%;
      height: 100%;
      max-height: 38px;
      min-height: 38px;

      border: 1px solid #0f0f10;
      background: #1e1f22;

      color: #f7f7f7;
      font-size: 14px;

      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      user-select: none;

      transition: all 400ms;

      & + button {
        border-top: ${index > 5 ? '0px' : `1px solid #0F0F10`};
        border-left: ${index === 6
          ? `1px solid #0F0F10`
          : index === 13
          ? `1px solid #0F0F10`
          : index === 20
          ? `1px solid #0F0F10`
          : index === 27
          ? `1px solid #0F0F10`
          : index === 34
          ? `1px solid #0F0F10`
          : '0px'};
      }

      &:after {
        content: '';

        width: calc(100% + 2px);
        height: 1px;

        background: ${hoverColor};

        position: absolute;
        top: -1px;
        left: -1px;

        transition: all 400ms;

        opacity: 0;
        visibility: hidden;
      }

      &:before {
        content: '';

        width: 1px;
        height: calc(100% + 2px);

        background: ${hoverColor};

        position: absolute;
        top: -1px;
        left: -1px;

        transition: all 400ms;

        opacity: 0;
        visibility: hidden;
      }

      &:hover {
        border-color: ${hoverColor};
        background: ${hoverColor};

        color: #f6f7f9;
        font-weight: bold;

        cursor: pointer;

        &:before,
        &:after {
          opacity: 1;
          visibility: visible;
        }
      }

      ${!day.isShow && dayVariations(index, hoverColor, day).hide}
      ${isToday && dayVariations(index, hoverColor, day).today}
      ${day.isShow &&
      isHovered &&
      dayVariations(index, hoverColor, day).hovered}
      ${isSelected && dayVariations(index, hoverColor, day).selected}
    `}
  `,
};

const dayVariations = (index: number, hoverColor: string, day: IDate) => ({
  hide: css`
    background: transparent !important;
    /* background: #0f0f10 !important; */
    border-top: 0 !important;
    border-right: 0 !important;
    border-left: 0 !important;

    ${isLastDayOfMonth(day.date) &&
    css`
      border-right: 1px solid transparent !important;
    `}

    ${index > 27 &&
    css`
      border-bottom: 0 !important;
    `}

    color: transparent !important;

    &:hover {
      border-color: transparent;
      background: transparent;

      color: transparent;

      cursor: initial;
    }

    &:after,
    &:before {
      display: none !important;
    }
  `,
  today: css`
    color: #176bf8;
    font-weight: bold;
  `,
  selected: css`
    border-color: ${hoverColor};
    background: ${hoverColor};

    color: #f7f7f7;
    font-weight: bold;

    &:after {
      opacity: 1;
      visibility: visible;
    }

    &:before {
      opacity: 1;
      visibility: visible;
    }
  `,
  hovered: css`
    border-color: ${hoverColor} !important;
    background: ${transparentize(0.8, hoverColor)};

    &:after {
      opacity: 1;
      visibility: visible;
    }

    &:before {
      opacity: 1;
      visibility: visible;
    }
  `,
});
