import { instance } from ".";

export const getDrivers = async (query: any) => {
  return await instance.get("drivers", {
    params: query,
  });
};
