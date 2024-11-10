import { useState, useEffect } from 'react';
import { useFilterRestaurants } from './common/resources/api/project/hooks';
import { columns } from './components/projects/columns';
import { ProjectsTable } from './components/projects/ProjectsTable';
import { ThemeProvider } from './components/theme-provider';
import { Project } from './common/resources/types/index'

export function App() {
  const [data, setData] = useState<Project[]>([]);
  const { data: projectsData } = useFilterRestaurants({ page: 1, itemsPage: 1000000});

  useEffect(() => {
    if (projectsData) {
      setData(projectsData);
    }
  }, [projectsData]);

  return (
    <ThemeProvider>
      <ProjectsTable
        data={data} 
        columns={columns}
      />
    </ThemeProvider>
  );
}
