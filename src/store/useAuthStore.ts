import { IWhoAmI } from "@/model/user";
import { create } from "zustand";

interface AuthState {
    userInfo?: IWhoAmI;
    update: (by: IWhoAmI) => void;
    reset: () => void;
}

// const dataTest = { name: "Tester", email: "test@gmail.com", phone: "0858136896" };

const useAuthStore = create<AuthState>()((set) => ({
    userInfo: undefined,
    update: (by: IWhoAmI | undefined) =>
        set((data) => {
            return {
                ...data,
                userInfo: by,
            };
        }),
    reset: () =>
        set((data) => {
            return {
                ...data,
                userInfo: undefined,
            };
        }),
}));

export default useAuthStore;
