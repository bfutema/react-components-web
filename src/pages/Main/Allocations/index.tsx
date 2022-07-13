import React, { useState, useEffect, useCallback } from 'react';

import { Timeline } from '@components/atoms';
import { IBar, ITimelineRow } from '@components/atoms/Timeline/interfaces';
import { IAllocation } from '@interfaces/models/IAllocation';
import { IProject } from '@interfaces/models/IProject';
import { TimelineService } from '@services/apis/TimelineService';

import { Container } from './styles';

const omni = {
  primary: '#1B1C22',
  weekend: '#1B1C22aa',
  background: '#0f0f10',
  font: { title: '#ffffff', subtitle: '#92abd8' },
  header: { background: '#8991a5', text: '#ffffff' },
  hover: '#176BF8',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

const devstream = {
  primary: '#232b47',
  weekend: '#29385c',
  background: '#0A192F',
  font: { title: '#E3E9EC', subtitle: '#92abd8' },
  header: { background: '#6c87bf', text: '#E3E9EC' },
  hover: '#00B0FF',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

const themes = { omni, devstream };

const Allocations: React.FC = () => {
  const [originalData, setOriginalData] = useState<IProject[]>();
  const [timelineData, setTimelineData] = useState<ITimelineRow[]>();

  const getTimelineRows = useCallback(
    (projects: IProject[]): ITimelineRow[] => {
      const parsedTimelineData: ITimelineRow[] = [];

      projects.forEach(project => {
        const associatedUsers = project.users_projects.map(up => up.user_id);

        parsedTimelineData.push({
          id: project.id,
          name: project.name,
          variation: 'PROJECT',
          color: '',
          bars: [],
          startDate: new Date(project.start_date),
          endDate: new Date(project.end_date),
          summary_activities: project.summary_activities.filter(sa =>
            associatedUsers.includes(sa.user_id),
          ),
        });

        project.users_projects.forEach(user_project => {
          const bars: any[] = project.allocations
            .filter(allocation => allocation.user_id === user_project.user_id)
            .map(allocation => ({
              id: allocation.id,
              color: allocation.color,
              start: allocation.start,
              end: allocation.end,
            }));

          parsedTimelineData.push({
            id: user_project.user_id,
            name: user_project.user?.name || '',
            variation: 'USER',
            color: '',
            bars,
            startDate: new Date(project.start_date),
            endDate: new Date(project.end_date),
            summary_activities: project.summary_activities.filter(sa =>
              associatedUsers.includes(sa.user_id),
            ),
          });
        });
      });

      return parsedTimelineData;
    },
    [],
  );

  const handleUpdateBar = useCallback(
    async (bar: IBar) => {
      const allAllocations: IAllocation[] = [];

      originalData?.forEach(project => {
        project.allocations.forEach(allocation => {
          allAllocations.push(allocation);
        });
      });

      const foundedAllocation = allAllocations.find(
        allocation => allocation.id === bar.id,
      );

      if (!foundedAllocation) return;

      await TimelineService.AllocationsService.update({
        id: foundedAllocation.id,
        color: foundedAllocation?.color,
        user_id: foundedAllocation?.user_id,
        project_id: foundedAllocation?.project_id,
        start: bar.start,
        end: bar.end,
      });
    },
    [originalData],
  );

  useEffect(() => {
    async function load() {
      const projects = await TimelineService.ProjectsService.list();

      setOriginalData(projects);
      setTimelineData(getTimelineRows(projects));
    }

    load();
  }, [getTimelineRows]);

  return (
    <Container>
      <Timeline
        data={timelineData}
        colors={themes.omni}
        onUpdateBar={handleUpdateBar}
        // prevMonthsQuantity={6}
        // nextMonthsQuantity={5}
        // variation="REPORT"
      />
    </Container>
  );
};

export { Allocations };
