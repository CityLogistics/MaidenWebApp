import { instance } from ".";

export const getRecentOrders = async () => {
  return await instance.get("orders");
};
