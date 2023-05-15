import { create } from "zustand";

interface IFestivalNumber{
    festivalNumber:number | null;
    setFestivalNumber:(setFestivalNumber:number)=>void;
}

const useStore=create<IFestivalNumber>((set)=>({
    festivalNumber:null,
    setFestivalNumber:(festivalNumber)=>set((state)=>({festivalNumber}))
}))

export default useStore;