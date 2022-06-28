import { apiClient } from "./ApiClient";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await apiClient({ url, method, data, params });
      return { data: result };
    } catch (apiError) {
      return { error: apiError };
    }
  };
