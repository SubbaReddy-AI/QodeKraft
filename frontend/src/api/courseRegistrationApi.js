import apiClient from "./apiClient";

export const startCourseRegistration = (payload) =>
  apiClient.post("/course-registrations/start", payload);

export const verifyCourseRegistrationPayment = (payload) =>
  apiClient.post("/course-registrations/verify", payload);
