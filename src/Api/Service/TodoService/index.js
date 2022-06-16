import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

export const getTodos = () => {
  return apiClient.get(Endpoints.TODO, {});
};
export const get404 = () => {
  return apiClient.get(Endpoints.TEST + "/not-found", {});
};
export const get401 = () => {
  return apiClient.get(Endpoints.TEST + "/unauth", {});
};
export const get403 = () => {
  return apiClient.get(Endpoints.TEST + "/forbi", {});
};
export const get500 = () => {
  return apiClient.get(Endpoints.TEST + "/internal", {});
};
