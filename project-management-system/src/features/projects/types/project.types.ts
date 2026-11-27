import type { ProjectFormValues } from '../schemas/project.schema';

export interface Project extends ProjectFormValues {
  id: string;
  createdAt: string;
}