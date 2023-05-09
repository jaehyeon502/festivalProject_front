
import {create} from 'zustand';

interface ISignUpStore{
    userId:string;
    password:string;
    passwordCheck:string;
    nickname:string;
    telNumber:string;
    address:string;
    addressDetail:string;
    signUpError:boolean;
    interestedFestivalType:string[];
    setUserId:(setUserId:string)=>void;
    setPassword:(setPasswrod:string)=>void;
    setPasswordCheck:(setPasswordCheck:string)=>void;
    setNickname:(setNickname:string)=>void;
    setAddress:(setAddress:string)=>void;
    setAddressDetail:(setAddressDetail:string)=>void;
    setSignUpError:(setSignUpError:boolean)=>void;
    setInterestedFestivalType:(setInterestedFestivalType:string[])=>void;



}

const useStore=create<ISignUpStore>((set)=>({
    userId:'',
    password:'',
    passwordCheck:'',
    nickname:'',
    telNumber:'',
    address:'',
    addressDetail:'',
    interestedFestivalType: [],
    signUpError:false,
    setUserId:(userId)=>set((state)=>({...state,userId})),
    setPassword:(password)=>set((state)=>({...state,password})),
    setPasswordCheck:(passwordCheck)=>set((state)=>({...state,passwordCheck})),
    setNickname:(nickname)=>set((state)=>({...state,nickname})),
    setAddress:(address)=>set((state)=>({...state,address})),
    setAddressDetail:(address)=>set((state)=>({...state,address})),
    setSignUpError:(signUpError:boolean)=>set((state)=>({...state,signUpError})),
    setInterestedFestivalType:(interestedFestivalType:string[])=>set((state)=>({...state,interestedFestivalType})),


}))

export default useStore;