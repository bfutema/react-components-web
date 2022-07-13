import { FixedSizeList } from 'react-window';

import styled from 'styled-components';

export const Container = styled.div``;

export const Items = styled(FixedSizeList)`
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const CalendarItems = styled(FixedSizeList)`
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
