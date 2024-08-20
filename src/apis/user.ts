import { instance } from ".";

export const updateUser = async (data: any) => {
  return await instance.post("auth/login", data);
};
