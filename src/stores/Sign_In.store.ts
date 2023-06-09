import User from "src/interfaces/User.interface";
import { create } from "zustand";

interface IUserSIgnInStore {
    signInUser: User | null;
    setSignInUser: (user: User) => void;
    resetSignInUser: () => void;
}
const useStore = create<IUserSIgnInStore>((set) => ({
    signInUser: null,
    setSignInUser: (signInUser: User) => set((state) => ({ ...state, signInUser })),
    resetSignInUser: () => set((state) => ({ ...state, signInUser: null })),
}))

export default useStore;