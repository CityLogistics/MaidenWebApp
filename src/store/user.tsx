import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const user = {
  image: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  cities: [],
  province: "",
};

type User = typeof user;

interface UserState {
  user: User & { role?: "ADMIN" | "DRIVER" | "SUPER_ADMIN" };
  setUser: (data: User) => void;
  updateUser: (data: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user,
      setUser: (data) => set(() => ({ user: data })),
      updateUser: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),
      clearUser: () => set(() => ({ user })),
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: "cityLogistics",
    }
  )
);
