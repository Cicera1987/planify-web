import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

import {
  Job,
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  JobRequest,
} from "@/app/services/jobService";
import { setJobList } from "../store/features/jobsSlice";
import { useCallback } from "react";

export const useJobs = () => {
  const dispatch = useDispatch();
  const jobList = useSelector((state: RootState) => state.jobs.list);

  const addJob = async (jobData: JobRequest) => {
    const newJob = await createJob(jobData);
    dispatch(setJobList([...jobList, newJob]));
  };

  const editJob = async (id: number, jobData: JobRequest) => {
    const updatedJob = await updateJob(id, jobData);
    dispatch(setJobList(jobList.map((j) => (j.id === id ? updatedJob : j))));
  };

  const removeJob = async (id: number) => {
    await deleteJob(id);
    dispatch(setJobList(jobList.filter((j) => j.id !== id)));
  };

  const loadJobs = async () => {
    const jobs = await getAllJobs();
    dispatch(setJobList(jobs));
  };

  const fetchJobs = useCallback(async () => {
    const jobs = await getAllJobs();
    dispatch(setJobList(jobs));
  }, [dispatch]); 

  return { jobList, addJob, editJob, removeJob, loadJobs, fetchJobs };
};
