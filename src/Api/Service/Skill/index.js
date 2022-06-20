import _ from "lodash";
import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

/**
 * @method
 * @prop {number} skillId
 * @returns {ISkill}
 */
export const getSkillById = async (skillId) => {
    return await apiClient.get(`${Endpoints.SKILL}/${skillId}`);
}