import _ from "lodash";
import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

/**
 * @method
 * @param {number} jobId
 * @returns {IOffer}
 */
export const getOffersByJobId = async (jobId) => {
  return await apiClient.get(`${Endpoints.OFFER}/${jobId}`);
};

/**
 * @method
 * @param {number} jobId
 * @param {IOffer} offerInfo
 * @returns {IOffer}
 */
export const createOffer = async (jobId, offerInfo) => {
  return await apiClient.post(`${Endpoints.OFFER}/${jobId}`, offerInfo);
};

/**
 * @method
 * @param {number} jobId
 * @param {IOffer} offerInfo
 * @returns {IJob}
 */
export const updateOffer = async (jobId, offerInfo) => {
  return await apiClient.put(`${Endpoints.OFFER}/${jobId}`, offerInfo);
};

/**
 * @method
 * @param {number} jobId
 * @param {number} adminId
 * @param {string} reason
 */
export const banJob = async (jobId, adminId, reason) => {
  return await apiClient.delete(`${Endpoints.OFFER}/${jobId}`, {
    adminId,
    reason,
  });
};

/**
 * @method
 * @param {number} jobId
 * @param {number} statusNumber
 * @returns {IJob}
 */
export const updateOfferStatus = async (jobId, statusNumber) => {
  return await apiClient.put(`${Endpoints.OFFER_STATUS}/${jobId}`, {
    status: statusNumber,
  });
};
