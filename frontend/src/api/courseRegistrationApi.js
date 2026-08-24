import apiClient from "./apiClient";

export const startCourseRegistration = (payload) => {
  return apiClient.post("/course-registrations/start", payload);
};

export const verifyCourseRegistrationPayment = (payload) => {
  return apiClient.post("/course-registrations/verify", payload);
};

export const getRegistrationSummary = (courseId, email) => {
  return apiClient.get(
    `/course-registrations/${courseId}/summary?email=${encodeURIComponent(email)}`
  );
};