import { IGeneric } from '@interfaces/generic/IGeneric';

export interface IAllocation extends IGeneric {
  user_id: number;
  project_id: number;
  color: string;
  start: string;
  end: string;
}
