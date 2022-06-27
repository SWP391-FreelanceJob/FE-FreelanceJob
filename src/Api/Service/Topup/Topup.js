import { apiClient } from "@/Api/Client/ApiClient";
import { Endpoints } from "@/Api/Endpoints";

export async function topup(topup) {
  return await apiClient.post(Endpoints.TOPUP, topup);
}
