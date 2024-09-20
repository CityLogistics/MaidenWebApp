import { instance } from ".";

export const getUsers = async (params: any) => {
  return await instance.get("users", { params });
};

export const addUser = async (data: any) => {
  return await instance.post("users", data);
};

export const deleteUser = async (id: any) => {
  return await instance.delete(`users/${id}`);
};

export const updateUser = async (data: any) => {
  return await instance.patch("users", data);
};
