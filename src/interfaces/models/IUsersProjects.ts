import { IProject } from './IProject';
import { IUser } from './IUser';

export interface IUsersProjects {
  id?: number;
  user_id: number;
  user?: IUser;
  project_id: number;
  project: IProject;
  associated_at?: Date;
}
