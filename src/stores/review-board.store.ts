import { ReviewBoard } from "src/interfaces";
import { create } from "zustand";

interface IReviewBoardStore {
    reviewBoard: ReviewBoard | null;
    setReviewBoard: (reviewBoard: ReviewBoard) => void;

    reviewBoardList: number[];
    setReviewBoardList: (reviewBoardList: number[]) => void;

}
const useStore = create<IReviewBoardStore>((set) => ({
    reviewBoard: null,
    setReviewBoard: (reviewBoard: ReviewBoard) => set((state) => ({ ...state, reviewBoard })),

    reviewBoardList: [],
    setReviewBoardList: (reviewBoardList: number[]) => set((state) => ({ ...state, reviewBoardList })),
    
}))

export default useStore;