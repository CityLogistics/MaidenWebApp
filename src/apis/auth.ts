import { instance } from ".";

export const login = async (data: any) => {
  return await instance.post("auth/login", data);
};

export const changePassword = async (data: any) => {
  return await instance.post("auth/change-password", data);
};

export const forgotPassword = async (data: any) => {
  return await instance.post("auth/forgot-password", data);
};

export const resetPassword = async ({ data, token }: any) => {
  return await instance.post("auth/reset-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
