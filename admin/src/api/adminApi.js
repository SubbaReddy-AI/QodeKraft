import axios from "axios";

const adminApi = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(
    "qodekraft_admin_token"
  );

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(
        "qodekraft_admin_token"
      );
    }

    return Promise.reject(error);
  }
);

export const adminLogin = async (email, password) => {
  const response = await adminApi.post(
    "/auth/login",
    { email, password }
  );

  return response.data;
};

export const getAdminProfile = async () => {
  const response = await adminApi.get("/auth/me");

  return response.data;
};

export const getDashboardStats = async () => {
  const response = await adminApi.get(
    "/users/dashboard-stats"
  );

  return response.data;
};

export const getAdminList = async (endpoint, params = {}) => {
  const response = await adminApi.get(endpoint, {
    params,
  });

  return response.data;
};

export const createAdminItem = async (endpoint, data) => {
  const response = await adminApi.post(endpoint, data);

  return response.data;
};

export const updateAdminItem = async (
  endpoint,
  id,
  data
) => {
  const response = await adminApi.put(
    `${endpoint}/${id}`,
    data
  );

  return response.data;
};

export const deleteAdminItem = async (endpoint, id) => {
  const response = await adminApi.delete(
    `${endpoint}/${id}`
  );

  return response.data;
};

export default adminApi;