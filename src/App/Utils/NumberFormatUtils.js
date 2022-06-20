export const formatToVND = (money) => {
  return `${money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ`;
};
