import apiClient from "../api/client";

export const requestService = {
  list: async () => {
    const response = await apiClient.get("/requests");
    return response.data;
  },
  get: async (id) => {
    const response = await apiClient.get(`/requests/${id}`);
    return response.data;
  },
  create: async (payload) => {
    const response = await apiClient.post("/requests", payload);
    return response.data;
  },
  update: async (id, payload) => {
    const response = await apiClient.put(`/requests/${id}`, payload);
    return response.data;
  },
  remove: async (id) => {
    await apiClient.delete(`/requests/${id}`);
  },
  listReviewers: async () => {
    const response = await apiClient.get("/requests/reviewers");
    return response.data;
  },
};
