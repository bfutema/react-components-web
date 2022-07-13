import { IGeneric } from '@interfaces/generic/IGeneric';

import { IUsersProjects } from './IUsersProjects';

export interface IUser extends IGeneric {
  name: string;
  email: string;
  users_projects?: IUsersProjects[];
}
