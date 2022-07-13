import { AllocationsService } from './AllocationsService';
import { ProjectsService } from './ProjectsService';

class TimelineService {
  public ProjectsService = ProjectsService;

  public AllocationsService = AllocationsService;
}

const INSTANCE = new TimelineService();

export { INSTANCE as TimelineService };
