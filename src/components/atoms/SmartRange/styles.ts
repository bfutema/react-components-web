import styled, { css } from 'styled-components';

export interface IFieldFeedback {
  isFocused: boolean;
}

interface IContainerProps extends IFieldFeedback {
  isComparing: boolean;
  variation?: 'rounded' | 'lined';
  externalInteraction?: boolean;
}

const containerVariations = (isFocused: boolean) => ({
  rounded: css`
    border-radius: 8px;
    outline: 1px solid ${isFocused ? '#176BF8' : '#707070'};

    > input {
      border-radius: 8px;
      background: ${isFocused ? '#1B1C22' : '#0f0f10'};
    }
  `,
  lined: css`
    border-bottom: 1px solid ${isFocused ? '#176BF8' : '#707070'};

    > input {
      background: transparent;
    }
  `,
});

export const Container = styled.div<IContainerProps>`
  ${({
    isFocused,
    isComparing,
    variation = 'lined',
    externalInteraction,
  }) => css`
    width: ${isComparing ? '420px' : '220px'};
    height: 40px;

    margin-right: ${externalInteraction ? '86px' : '0px'};

    position: relative;

    display: flex;
    align-items: center;

    transition: all 400ms;

    ${containerVariations(isFocused)[variation]}

    > input {
      width: 100%;
      height: 100%;

      border: none;
      outline: none;

      color: #f6f7f9;
      font-size: 14px;
      font-weight: normal;

      padding: 0 8px;

      cursor: pointer;

      transition: all 400ms;

      &::placeholder {
        color: #707070;
      }
    }
  `}
`;

interface IInfoProps {
  isComparing: boolean;
}

export const Info = styled.div<IInfoProps>`
  ${({ isComparing }) => css`
    position: absolute;
    right: ${isComparing ? '440px' : '240px'};

    span {
      color: #f6f7f9;
      font-size: 14px;
      white-space: nowrap;
    }
  `}
`;

type IArrowProps = IFieldFeedback;

export const Arrow = styled.div<IArrowProps>`
  ${({ isFocused }) => css`
    width: 0;
    height: 0;

    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 9px solid ${isFocused ? '#176BF8' : '#707070'};

    position: absolute;
    right: 8px;

    pointer-events: none;

    cursor: pointer;

    transform: ${isFocused ? 'rotate(0deg)' : 'rotate(180deg)'};

    transition: all 400ms;
  `}
`;

export const Actions = styled.div`
  ${() => css`
    position: absolute;
    right: -86px;

    gap: 6px;
    display: flex;
    align-items: center;

    button {
      width: 34px;
      height: 34px;

      border-radius: 50%;
      border: 1px solid transparent;
      background: none;

      color: #f6f7f9;
      text-transform: capitalize;

      gap: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      transition: all 400ms;

      svg polyline {
        transition: all 400ms;
      }

      &:not([disabled]) {
        &:hover {
          border: 1px solid #176bf8;

          svg polyline {
            stroke: #176bf8;
          }
        }

        &:active {
          transform: scale(0.9);
        }
      }
    }
  `}
`;
