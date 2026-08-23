import apiClient from "./apiClient";

export const sendContactMessage = (
  data
) =>
  apiClient.post(
    "/contacts",
    data
  );