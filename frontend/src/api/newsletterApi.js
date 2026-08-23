import apiClient from "./apiClient";

export const subscribeNewsletter = (
  email
) =>
  apiClient.post(
    "/newsletter",
    {
      email,
    }
  );