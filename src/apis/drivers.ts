import { instance } from ".";

export const getDrivers = async (query: any) => {
  return await instance.get("drivers", {
    params: query,
  });
};

export const decideOrderAssignment = async ({ id, data }: any) => {
  return await instance.patch(`drivers/decide-order-assignment/${id}`, data);
};

export const updateDriverOrderStatus = async ({ id, order }: any) => {
  return await instance.patch(`drivers/order/${id}`, order);
};
