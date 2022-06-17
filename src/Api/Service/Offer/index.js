/**
 * @method
 * @param {number} jobId
 * @returns {IOfferRequest}
 */
export const getOffersByJobId = async (jobId) => {
  return await apiClient.get(`${Endpoints.OFFER}/${jobId}`);
};

/**
 * @method
 * @param {number} jobId
 * @param {IJob} jobInfo
 * @returns {IJob}
 */
export const createOffer = async (jobId, jobInfo) => {
  return await apiClient.post(`${Endpoints.OFFER}/${jobId}`, jobInfo);
};

/**
 * @method
 * @param {number} jobId
 * @param {IJob} jobInfo
 * @returns {IJob}
 */
export const updateOffer = async (jobId, jobInfo) => {
  return await apiClient.put(`${Endpoints.OFFER}/${jobId}`, jobInfo);
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
