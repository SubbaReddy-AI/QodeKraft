import apiClient from "./apiClient";

export const getInternships = () =>
  apiClient.get("/internships");

export const getInternship = (slug) =>
  apiClient.get(`/internships/${slug}`);

export const applyInternship = (formData) =>
  apiClient.post(
    "/internships/apply",
    formData
  );