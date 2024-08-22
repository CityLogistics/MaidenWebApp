import { instance } from ".";

export const updateUser = async (data: any) => {
  return await instance.patch("users", data);
};
