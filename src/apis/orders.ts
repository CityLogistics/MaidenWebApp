import { instance } from ".";

export const getOrders = async (query: any) => {
  return await instance.get("orders", {
    params: query,
  });
};

export const getNewOrders = async (query: any) => {
  return await instance.get("orders/new", {
    params: query,
  });
};

export const updateOrderStatus = async ({ id, order }: any) => {
  return await instance.patch(`orders/${id}`, order);
};
