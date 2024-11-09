import { useState, useEffect } from 'react';
import { Project } from '../App'

// export type Project = {
//   id: string;
//   externalId: string;
//   name: string;
//   department: string;
//   requester: string;
//   status: "In Progress" | "Backlog" | "Declined" | "Completed" | "On Hold";
//   impactStakeholders: boolean;
//   priorityLevel: number;
//   requestDate: Date;
// };

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://project-management-wobh.onrender.com/project?page=1&itemsPage=1000000');
      const result = await response.json();
      setProjects(result.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const response = await fetch(`https://project-management-wobh.onrender.com/project/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
      } else {
        alert('Erro ao deletar o projeto.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Erro ao realizar a requisição de exclusão.');
    }
  };

  const updateProject = (updatedProject: Project) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) =>
        project.id === updatedProject.id ? { ...project, ...updatedProject } : project
      );
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    fetchProjects,
    deleteProject,
    updateProject,
  };
}
