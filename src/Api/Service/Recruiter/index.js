import _ from "lodash";
import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

/**
 * @method
 * @prop {number} recruiterId
 * @returns {IRecruiter}
 */
export const getRecruiterById = async (recruiterId) => {
    return await apiClient.get(`${Endpoints.RECRUITER}/${recruiterId}`);
}