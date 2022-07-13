import { IAllocation } from '@interfaces/models/IAllocation';
import { api } from '@services/api';

class AllocationsService {
  public async list(): Promise<IAllocation[]> {
    const { data } = await api.get<IAllocation[]>('/allocations');

    return data;
  }

  public async create(): Promise<IAllocation> {
    const { data } = await api.post<IAllocation>('/allocations');

    return data;
  }

  public async update(data: IAllocation): Promise<void> {
    await api.put(`/timeline/allocations/${data.id}`, data);
  }
}

const INSTANCE = new AllocationsService();

export { INSTANCE as AllocationsService };
