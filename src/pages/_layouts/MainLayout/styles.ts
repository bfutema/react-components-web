import styled, { css } from 'styled-components';

interface IContainerProps {
  isFolded: boolean;
}

export const Container = styled.div<IContainerProps>`
  ${() => css``}
`;
