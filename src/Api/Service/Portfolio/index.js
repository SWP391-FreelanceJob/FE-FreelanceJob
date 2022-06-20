import _ from "lodash";
import { apiClient } from "../../Client/ApiClient";
import { Endpoints } from "../../Endpoints";

/**
 * @method
 * @param {number} freelancerId
 * @returns {IPortfolio}
 */
export const getPortfolioByFreelancerId = async (freelancerId) => {
  return await apiClient.get(`${Endpoints.PORTFOLIO}/${freelancerId}`);
};

/**
 * @method
 * @param {number} portfolioId
 * @returns {IPortfolio}
 */
export const updatePortfolio = async (portfolioId) => {
  return await apiClient.put(`${Endpoints.PORTFOLIO}/${portfolioId}`);
};
