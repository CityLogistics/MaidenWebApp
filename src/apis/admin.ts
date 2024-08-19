import { instance } from ".";

export const asignOrderToDriver = async (orderId: any, driverId: any) => {
  return await instance.patch(
    `/admin/order/${orderId}/asign-driver/${driverId}`
  );
};
