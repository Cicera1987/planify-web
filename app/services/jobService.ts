import { api } from "./api";

export interface Job {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  duration: number;
  ownerId: number;
  quantity: number;
  createdAt: string;
}

export interface JobRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  duration: number;
}

export const getAllJobs = async (): Promise<Job[]> => {
  const res = await api.get<Job[]>("/services");
  return res.data;
};

export const getJobById = async (id: number): Promise<Job> => {
  const res = await api.get<Job>(`/services/${id}`);
  return res.data;
};

export const createJob = async (job: JobRequest): Promise<Job> => {
  const res = await api.post<Job>("/services", job);
  return res.data;
};

export const updateJob = async (id: number, job: JobRequest): Promise<Job> => {
  const res = await api.put<Job>(`/services/${id}`, job);
  return res.data;
};

export const deleteJob = async (id: number): Promise<void> => {
  await api.delete(`/services/${id}`);
};
