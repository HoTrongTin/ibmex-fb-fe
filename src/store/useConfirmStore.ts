import { create } from "zustand";

interface ConfirmStore {
    open: boolean;
    update: (by: boolean) => void;
}

const useConfirmStore = create<ConfirmStore>()((set) => ({
    open: false,
    update: (by: boolean | undefined) =>
        set((data) => {
            return {
                ...data,
                open: by,
            };
        }),
}));

export default useConfirmStore;
