import { instance } from ".";

export const addCity = async (data: any) => {
  return await instance.post(`cities`, data);
};

export const getCities = async (query: any) => {
  return await instance.get("cities", {
    params: query,
  });
};

export const getCitiesByProvince = async (query: any) => {
  return await instance.get("cities/find-by-province", {
    params: query,
  });
};

export const updateCityStatus = async ({ id, data }: any) => {
  return await instance.patch(`cities/${id}/update-status`, data);
};

export const rejectOrder = async ({ id }: any) => {
  return await instance.post(`orders/reject/${id}`);
};
