import apiClient from "../api/client";

export const reviewerService = {
  listAssigned: async () => {
    const response = await apiClient.get("/reviewer/requests");
    return response.data;
  },
  approve: async (id, comments) => {
    const response = await apiClient.post(`/reviewer/requests/${id}/approve`, { comments });
    return response.data;
  },
  reject: async (id, comments) => {
    const response = await apiClient.post(`/reviewer/requests/${id}/reject`, { comments });
    return response.data;
  },
};
