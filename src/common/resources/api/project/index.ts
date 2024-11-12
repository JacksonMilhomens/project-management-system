import { api } from "..";
import { Project, UpdateProjectData, CreateProjectData } from "../../types";

const prefix = "/project";

export interface QueryParamsProjects {
  page?: number;
  itemsPage: number;
}

export const ProjectApi = {
  async createProject(createProjectData: CreateProjectData): Promise<void> {
    const { data } = await api.post(`${prefix}`, createProjectData);
    return data;
  },

  async listAllProjects(search?: QueryParamsProjects): Promise<Project[]> {
    const { data } = await api.get(`${prefix}`, { params: search });
    return data.projects;
  },

  async getProjectById(id: string): Promise<Project> {
    const { data } = await api.get(`${prefix}/${id}`);
    return data;
  },

  async updateProject(
    id: string,
    updateProjectData: UpdateProjectData
  ): Promise<void> {
    await api.put(`${prefix}/${id}`, updateProjectData);
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`${prefix}/${id}`);
  },
};
