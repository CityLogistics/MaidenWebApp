import { instance } from ".";

export const login = async (data: any) => {
  return await instance.post("auth/login", data);
};
