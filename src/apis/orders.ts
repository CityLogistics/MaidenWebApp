import { instance } from ".";

export const getOrders = async (query: any) => {
  return await instance.get("orders", {
    params: query,
  });
};

export const getManualOrders = async (query: any) => {
  return await instance.get("orders/manual-request", {
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

export const setOrderPrice = async ({ id, data }: any) => {
  return await instance.post(`orders/set-price/${id}`, data);
};
export const rejectOrder = async ({ id }: any) => {
  return await instance.post(`orders/reject/${id}`);
};

export const rejectQuoteRequest = async ({ id }: any) => {
  return await instance.post(`orders/reject-quote/${id}`);
};
