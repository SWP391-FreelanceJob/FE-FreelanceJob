import _ from "lodash";
import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

/**
 * @method
 * @param {boolean} isAscending
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {number} limit
 * @returns {IPagination<IProject>}
 */

export const getAllProjects = async (
  isAscending = true,
  pageSize = 10,
  limit = 10,
  pageNo = 0
) => {
  let requestParam = `limit=${limit}&pageSize=${pageSize}&pageNo=${pageNo}&isAscending=${isAscending}&`;
  // if (!_.isNil(skills)) requestParam.concat(`skill=${skills}&`);
  // if (!_.isNil(name)) requestParam.concat(`name=${name}&`);
  // if (!_.isNil(status)) requestParam.concat(`status=${status}&`);

  return await apiClient.get(`${Endpoints.PROJECTS}?${requestParam}`);
};

/**
 * @method
 * @param {number} portfolioId
 * @returns {IProject}
 */
export const getProjectByPortfolioId = async (portfolioId) => {
  return await apiClient.get(`${Endpoints.PROJECT}/${portfolioId}`);
};

/**
 * @method
 * @param {string} projectName
 * @param {string} imageUrl
 * @param {string} description
 * @param {number[]} skillIds
 * @returns {IProject}
 */
export const createProject = async (
  projectName,
  description,
  imageUrl,
  skillIds
) => {
  return await apiClient.post(`${Endpoints.PROJECT}`, {
    name: projectName,
    description,
    imageUrl,
    skills: skillIds,
  });
};

/**
 * @method
 * @param {number} projectId
 * @param {string} projectName
 * @param {string} imageUrl
 * @param {string} description
 * @param {number[]} skillIds
 * @returns {IProject}
 */
export const updateProject = async (
  projectId,
  projectName,
  description,
  imageUrl,
  skillIds
) => {
  return await apiClient.put(`${Endpoints.PROJECT}/${projectId}`, {
    name: projectName,
    description,
    imageUrl,
    skills: skillIds,
  });
};
