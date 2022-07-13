import { IProject } from '@interfaces/models/IProject';
import { api } from '@services/api';

class ProjectsService {
  public async list(): Promise<IProject[]> {
    const { data } = await api.get<IProject[]>('/timeline/projects');

    return data;
  }

  public async create(): Promise<IProject> {
    const { data } = await api.post<IProject>('/timeline/projects');

    return data;
  }
}

const INSTANCE = new ProjectsService();

export { INSTANCE as ProjectsService };
