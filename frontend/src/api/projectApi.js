import apiClient from "./apiClient";

export const getProjects = () =>
  apiClient.get("/projects");

export const getFeaturedProjects = () =>
  apiClient.get("/projects/featured");

export const getProject = (slug) =>
  apiClient.get(`/projects/${slug}`);