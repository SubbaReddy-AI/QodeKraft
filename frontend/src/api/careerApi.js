import apiClient from "./apiClient";

export const getJobs = () =>
  apiClient.get("/careers");

export const getJob = (slug) =>
  apiClient.get(`/careers/${slug}`);

export const applyJob = (formData) =>
  apiClient.post(
    "/careers/apply",
    formData
  );