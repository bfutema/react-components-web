export interface IGeneric {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export type Full<T> = {
  [P in keyof T]-?: T[P];
};
