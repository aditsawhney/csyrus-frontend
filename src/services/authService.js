import apiClient from "../api/client";

export const authService = {
  getGoogleLoginUrl: () => `${apiClient.defaults.baseURL}/auth/google/login`,

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};
