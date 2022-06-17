import _ from "lodash";
import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

/** 
 * @method
 * @param {string[]} skills
 * @param {string} name
 * @param {boolean} isAscending
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {number} limit
 * @returns {IPagination<IFreelancer>}
 */

//pagination params will use default values if their values are not provided
export const getAllFreelancers = async (skills, name, isAscending = true, pageSize = 10, limit = 10, pageNo = 0) => {
    let requestParam = `limit=${limit}&pageSize=${pageSize}&pageNo=${pageNo}&isAscending=${isAscending}&`;
    if (!_.isNil(skills)) requestParam.concat(`skill=${skills}&`);
    if (!_.isNil(name)) requestParam.concat(`name=${name}&`);
    
    return await apiClient.get(`${Endpoints.FREELANCERS}?${requestParam}`);
}

/**
 * 
 * @param {number} freelancerId 
 * @returns {IFreelancer}
 */
export const getFreelancerById = async (freelancerId) => {
    return await apiClient.get(`${Endpoints.FREELANCER}/${freelancerId}`);
}
