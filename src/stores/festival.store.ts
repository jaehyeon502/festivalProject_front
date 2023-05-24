import { create } from 'zustand';

interface IPreviewFestivalSimpleListItemStore {
    festivalNumber: number | null;
    setFestivalNumber: (festivalNumber: null) => void;
}

const useStore = create<IPreviewFestivalSimpleListItemStore>((set) => ({
    festivalNumber: null,
    setFestivalNumber: (festivalNumber) => set((state) => ({ ...state, festivalNumber }))
}))

export default useStore;