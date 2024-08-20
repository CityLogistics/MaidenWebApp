import { create } from "zustand";

const user = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
};

type User = typeof user;

interface UserState {
  user: User;
  setUser: (data: User) => void;
  updateUser: (data: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user,
  setUser: (data) => set(() => ({ user: data })),
  updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
  clearUser: () => set(() => ({ user })),
}));
