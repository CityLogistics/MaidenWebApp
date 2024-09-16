import { instance } from ".";

export const updateUser = async (data: any) => {
  return await instance.patch("users", data);
};

export const addUser = async (data: any) => {
  return await instance.post("users", data);
};
