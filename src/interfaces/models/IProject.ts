import { Full, IGeneric } from '@interfaces/generic/IGeneric';

import { IAllocation } from './IAllocation';
import { ISummaryActivity } from './ISummaryActivity';
import { IUsersProjects } from './IUsersProjects';

export interface IProject extends Full<IGeneric> {
  name: string;
  start_date: Date;
  end_date: Date;
  users_projects: IUsersProjects[];
  summary_activities: ISummaryActivity[];
  allocations: IAllocation[];
}
