import { instance } from ".";

export const getCities = async (query: any) => {
  return await instance.get("cities", {
    params: query,
  });
};

export const getNewOrders = async (query: any) => {
  return await instance.get("orders/new", {
    params: query,
  });
};

export const updateOrderStatus = async ({ id, order }: any) => {
  return await instance.patch(`orders/status/${id}`, order);
};

export const rejectOrder = async ({ id }: any) => {
  return await instance.post(`orders/reject/${id}`);
};
