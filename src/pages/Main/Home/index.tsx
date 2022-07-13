import React, { useRef, useMemo } from 'react';

import { addDays } from 'date-fns';
import { v4 } from 'uuid';

import { CalendarItems, Container, Items } from './styles';

interface ICalendarItem {
  index: number;
  date: Date;
}

const Home: React.FC = () => {
  const fixedSizeListRef = useRef<any>(null);

  const calendarItems = useMemo(() => {
    const items: ICalendarItem[] = [];

    for (let index = 0; index < 1000; index++) {
      items.push({ index, date: addDays(new Date(), index) });
    }

    return items;
  }, []);

  return (
    <Container>
      <div style={{ border: '1px solid red', padding: '2px' }}>
        <div style={{ border: '1px solid yellow' }}>
          <strong>ItemHeader</strong>
        </div>

        <div style={{ border: '1px solid yellow' }}>
          <strong>ItemItems</strong>
        </div>

        <Items
          ref={fixedSizeListRef}
          itemCount={calendarItems.length}
          itemSize={47}
          width={window.innerWidth}
          height={500}
        >
          {({ index, style }) => {
            return (
              <div
                key={v4()}
                style={{
                  ...style,
                  display: 'grid',
                  gridTemplateColumns: '300px 1fr',
                  padding: '2px',
                }}
              >
                <div style={{ outline: '1px solid red' }}>
                  {calendarItems[index].index}
                </div>

                <div>
                  <CalendarItems
                    ref={fixedSizeListRef}
                    itemCount={calendarItems.length}
                    itemSize={47}
                    width={window.innerWidth - 300}
                    height={47}
                    direction="horizontal"
                  >
                    {({ style: style2 }) => {
                      return (
                        <div
                          style={{
                            ...style2,
                            width: '47px',
                            height: '47px',
                            outline: '1px solid red',
                          }}
                        >
                          {calendarItems[index].index}
                        </div>
                      );
                    }}
                  </CalendarItems>
                </div>
              </div>
            );
          }}
        </Items>
        <div style={{ border: '1px solid green' }}>
          <strong>CalendarHeader</strong>
        </div>

        <div style={{ border: '1px solid green' }}>
          <strong>CalendarItems</strong>
        </div>
      </div>
    </Container>
  );
};

export { Home };
