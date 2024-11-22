import { instance } from ".";

export const asignOrderToDriver = async (orderId: any, driverId: any) => {
  return await instance.patch(
    `/admin/order/${orderId}/asign-driver/${driverId}`
  );
};

export const changeDriverStatus = async (driverId: any, data: any) => {
  return await instance.patch(`/admin/driver/${driverId}`, data);
};

export const deleteDriver = async (driverId: any) => {
  return await instance.delete(`/admin/driver/${driverId}`);
};

export const getStats = async () => {
  return await instance.get(`/admin/stats`);
};
