import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

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

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("@planify/token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query<Job[], void>({
      query: () => "/services",
    }),
    getJobById: builder.query<Job, number>({
      query: (id) => `/services/${id}`,
    }),
    createJob: builder.mutation<Job, JobRequest>({
      query: (job) => ({
        url: "/services",
        method: "POST",
        body: job,
      }),
    }),
    updateJob: builder.mutation<Job, { id: number; job: JobRequest }>({
      query: ({ id, job }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: job,
      }),
    }),
    deleteJob: builder.mutation<void, number>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
