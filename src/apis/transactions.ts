import { instance } from ".";

export const getTransactions = async (query: any) => {
  return await instance.get("transactions", {
    params: query,
  });
};
