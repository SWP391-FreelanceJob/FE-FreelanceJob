import qs from 'qs'
import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

/**
 * @method
 * @param {string} idToken
 * @returns {IAccount}
 */
export const login = async (idToken) => {
  return apiClient.post(
    Endpoints.LOGIN,
    qs.stringify({idToken}),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
};

/**
 * @method
 * @param {number} accountId
 * @param {number} adminId
 * @param {string} reason
 * @returns {object}
 */
export const banAccount = async (accountId, adminId, reason) => {
  return await apiClient.put(`Endpoints.ACCOUNT/${accountId}`, {
    adminId,
    reason,
  });
};
