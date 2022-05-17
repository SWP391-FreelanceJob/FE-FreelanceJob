import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

export const getTodos = () => {
  return apiClient.get(Endpoints.TODO, {});
};
