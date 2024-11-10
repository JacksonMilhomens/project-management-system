import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryParamsProjects, ProjectApi } from ".";
import { UpdateProjectData } from "../../types";

export function useListRestaurants() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => ProjectApi.listAllProjects(),
    retry: false
  });
}

export function useFilterRestaurants(query: QueryParamsProjects) {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => ProjectApi.listAllProjects(query),
    enabled: true
  });
}

export function useGetRestaurant(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => ProjectApi.getProjectById(id),
    enabled: true
  });
}

export function useDeleteProject() {
  return useMutation({
    mutationFn: (id: string) => ProjectApi.deleteProject(id),
  });
}

export function useUpdateProject() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectData }) =>
      ProjectApi.updateProject(id, data),
  });
}
