
import { IPreviewFestivalItem } from 'src/interfaces';
import {create} from 'zustand';

interface IPreviewFestivalSimpleListItemStore {
    festival: IPreviewFestivalItem[] | null;
    setFestival:(setFestivalInformationUrl:IPreviewFestivalItem[] | null)=>void;
}

const useStore=create<IPreviewFestivalSimpleListItemStore>((set)=>({
    festival: [],
    setFestival:(festival)=>set((state)=>({...state,festival}))


}))

export default useStore;