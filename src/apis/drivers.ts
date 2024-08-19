import { instance } from ".";

export const getDrivers = async () => {
  return await instance.get("drivers", {});
};
