import { FreeBoard } from "src/interfaces";
import { create } from "zustand";

interface IFreeBoardStore {
    freeBoard: FreeBoard | null;
    setFreeBoard: (freeBoard: FreeBoard) => void;

    freeBoardList: number[];
    setFreeBoardList: (freeBoardList: number[]) => void;

}
const useStore = create<IFreeBoardStore>((set) => ({
    freeBoard: null,
    setFreeBoard: (freeBoard: FreeBoard) => set((state) => ({ ...state, freeBoard })),

    freeBoardList: [],
    setFreeBoardList: (freeBoardList: number[]) => set((state) => ({ ...state, freeBoardList })),
    
}))

export default useStore;