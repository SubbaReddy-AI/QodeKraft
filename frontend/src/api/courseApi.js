import apiClient from "./apiClient";

export const getCourses = () =>
  apiClient.get("/courses");

export const getCourse = (slug) =>
  apiClient.get(`/courses/${slug}`);