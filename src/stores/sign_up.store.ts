
import {create} from 'zustand';

interface ISignUpStore{
    userId:string;
    password:string;
    passwordCheck:string;
    nickname:string;
    telNumber:string;
    signUpError:boolean;
    interestedFestivalType:string[];
    setUserId:(setUserId:string)=>void;
    setPassword:(setPasswrod:string)=>void;
    setPasswordCheck:(setPasswordCheck:string)=>void;
    setNickname:(setNickname:string)=>void;
    setSignUpError:(setSignUpError:boolean)=>void;
    setInterestedFestivalType:(setInterestedFestivalType:string[])=>void;

}

const useStore=create<ISignUpStore>((set)=>({
    userId:'',
    password:'',
    passwordCheck:'',
    nickname:'',
    telNumber:'',
    interestedFestivalType: [],
    signUpError:false,
    setUserId:(userId)=>set((state)=>({...state,userId})),
    setPassword:(password)=>set((state)=>({...state,password})),
    setPasswordCheck:(passwordCheck)=>set((state)=>({...state,passwordCheck})),
    setNickname:(nickname)=>set((state)=>({...state,nickname})),
    setSignUpError:(signUpError:boolean)=>set((state)=>({...state,signUpError})),
    setInterestedFestivalType:(interestedFestivalType:string[])=>set((state)=>({...state,interestedFestivalType})),
}))

export default useStore;