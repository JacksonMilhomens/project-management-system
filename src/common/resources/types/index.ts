export type Project = {
  id: string;
  externalId: string;
  name: string;
  department: string;
  requester: string;
  description: string;
  status: "In Progress" | "Backlog" | "Declined" | "Completed" | "On Hold";
  goal: string;
  impactStakeholders: boolean;
  complexity: "High" | "Medium" | "Low";
  monthlyRequests: number;
  averageTimeSpent: number;
  monthlyMinutesSaved: number;
  financialGain: string;
  rangeOfGain: string;
  priorityLevel: number;
  requestDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateProjectData {
  name: string;
  department: string;
  requester: string;
  description: string;
  goal: string;
  impactStakeholders: boolean;
  complexity: string;
  monthlyRequests: number;
  averageTimeSpent: number;
  requestDate: string;
}

export interface UpdateProjectData {
  name: string;
  department: string;
  requester: string;
  description: string;
  goal: string;
  impactStakeholders: boolean;
  complexity: string;
  monthlyRequests: number;
  averageTimeSpent: number;
  requestDate: string;
  status: string;
}
