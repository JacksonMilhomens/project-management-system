
import { api } from "..";
import { Project, UpdateProjectData } from "../../types";

const prefix = '/project'

export interface QueryParamsProjects {
  page?: number,
  itemsPage: number,
}

export const ProjectApi = {
  async listAllProjects(search?: QueryParamsProjects): Promise<Project[]>{
    const { data } = await api.get(`${prefix}`, { params: search })
    return data.projects;
  },

  async getProjectById(id: string): Promise<Project>{
    const { data } = await api.get(`${prefix}/${id}`)
    return data;
  },
  
  async updateProject(id: string, data: UpdateProjectData): Promise<void> {
    await api.put(`${prefix}/${id}`, data);
  },

  async deleteProject(id: string): Promise<void>{
    await api.delete(`${prefix}/${id}`)
  },
}
