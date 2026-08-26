import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://qodekraft.onrender.com/api/v1";


const adminApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});


adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("qodekraft_admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


adminApi.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("qodekraft_admin_token");
      localStorage.removeItem("admin_token");
    }

    return Promise.reject(error);
  }
);


export const adminLogin = async (
  email,
  password
) => {
  const response = await adminApi.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};


export const getAdminList = async (endpoint) => {
  const response = await adminApi.get(endpoint);

  return response.data;
};


export const getAdminItem = async (endpoint) => {
  const response = await adminApi.get(endpoint);

  return response.data;
};


export const createAdminItem = async (
  endpoint,
  data
) => {
  const response = await adminApi.post(
    endpoint,
    data
  );

  return response.data;
};


export const updateAdminItem = async (
  endpoint,
  data
) => {
  const response = await adminApi.put(
    endpoint,
    data
  );

  return response.data;
};


export const deleteAdminItem = async (
  endpoint
) => {
  const response = await adminApi.delete(
    endpoint
  );

  return response.data;
};


export default adminApi;
<Route
   path="/course-registrations"
     element={<ProtectedRoute><CourseRegistrations /></ProtectedRoute>}
/>

<Route
  path="/certificates"
  element={
    <ProtectedRoute>
      <Certificates />
    </ProtectedRoute>
  }
/>