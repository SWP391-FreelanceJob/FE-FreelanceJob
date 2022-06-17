import _ from "lodash";
import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

/**
 * @method
 * @param {string[]} skills
 * @param {string} name
 * @param {number} status
 * @param {boolean} isAscending
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {number} limit
 * @returns {IPagination<IJob>}
 */

export const getAllJobs = async (
  skills,
  name,
  status,
  isAscending = true,
  pageSize = 10,
  limit = 10,
  pageNo = 0
) => {
  let requestParam = `limit=${limit}&pageSize=${pageSize}&pageNo=${pageNo}&isAscending=${isAscending}&`;
  if (!_.isNil(skills)) requestParam.concat(`skill=${skills}&`);
  if (!_.isNil(name)) requestParam.concat(`name=${name}&`);
  if (!_.isNil(status)) requestParam.concat(`status=${status}&`);

  return await apiClient.get(`${Endpoints.JOBS}?${requestParam}`);
};

/**
 * @method
 * @param {number} jobId
 * @returns {IJob}
 */
export const getJobById = async (jobId) => {
  return await apiClient.get(`${Endpoints.JOB}/${jobId}`);
};

/**
 * @method
 * @param {IJob} jobInfo
 * @returns {IJob}
 */
export const createJob = async (jobInfo) => {
  return await apiClient.post(`${Endpoints.JOB}`, jobInfo);
};

/**
 * @method
 * @param {number} jobId
 * @param {IJob} jobInfo
 * @returns {IJob}
 */
export const updateJob = async (jobId, jobInfo) => {
  return await apiClient.put(`${Endpoints.JOB}/${jobId}`, jobInfo);
};

/**
 * @method
 * @param {number} jobId
 * @param {number} adminId
 * @param {string} reason
 */
export const banJob = async (jobId, adminId, reason) => {
  return await apiClient.put(`${Endpoints.JOB}/${jobId}`, { adminId, reason });
};
