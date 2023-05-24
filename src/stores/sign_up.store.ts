import { create } from 'zustand';
interface ISignUpStore {
    userId: string;
    password: string;
    passwordCheck: string;
    nickname: string;
    profileUrl: string;
    telNumber: string;
    interestedFestival: string[];
    setUserId: (setUserId: string) => void;
    setPassword: (setPasswrod: string) => void;
    setPasswordCheck: (setPasswordCheck: string) => void;
    setNickname: (setNickname: string) => void;
    setProfileUrl: (setProfileUrl: string) => void;
    setTelNumber: (setTelNumber: string) => void;
    setInterestedFestival: (setInterestedFestival: string[]) => void;

    signUpError: boolean;
    setSignUpError: (setSignUpError: boolean) => void;

    userIdPatternCheck: boolean | null;
    setUserIdPatternCheck: (userIdPatternCheck: boolean) => void;
    userIdValidate: boolean | null;
    setUserIdValidate: (userIdValidate: boolean) => void;

    passwordPatternCheck: boolean | null;
    setPasswordPatternCheck: (passwordPatternCheck: boolean) => void;
    passwordValidate: boolean | null;
    setPasswordValidate: (passwordValidate: boolean) => void;

    nicknamePatternCheck: boolean | null;
    setNicknamePatternCheck: (nicknamePatternCheck: boolean) => void;
    nicknameValidate: boolean | null;
    setNicknameValidate: (nicknameValidate: boolean) => void;

    telNumberPatternCheck: boolean | null;
    setTelNumberPatternCheck: (telNumberPatternCheck: boolean) => void;
    telNumberValidate: boolean | null;
    setTelNumberValidate: (telNumberValidate: boolean) => void

}

const useStore = create<ISignUpStore>((set) => ({
    userId: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    profileUrl: '',
    telNumber: '',
    interestedFestival: [],
    setUserId: (userId) => set((state) => ({ ...state, userId })),
    setPassword: (password) => set((state) => ({ ...state, password })),
    setPasswordCheck: (passwordCheck) => set((state) => ({ ...state, passwordCheck })),
    setNickname: (nickname) => set((state) => ({ ...state, nickname })),
    setProfileUrl: (profileUrl) => set((state) => ({ ...state, profileUrl })),
    setTelNumber: (telNumber) => set((state) => ({ ...state, telNumber })),
    setInterestedFestival: (interestedFestival) => set((state) => ({ ...state, interestedFestival })),

    signUpError: false,
    setSignUpError: (signUpError: boolean) => set((state) => ({ ...state, signUpError })),

    userIdPatternCheck: null,
    setUserIdPatternCheck: (userIdPatternCheck) => set((state) => ({ ...state, userIdPatternCheck })),
    userIdValidate: null,
    setUserIdValidate: (userIdValidate) => set((state) => ({ ...state, userIdValidate })),

    passwordPatternCheck: null,
    setPasswordPatternCheck: (passwordPatternCheck) => set((state) => ({ ...state, passwordPatternCheck })),
    passwordValidate: null,
    setPasswordValidate: (passwordValidate) => set((state) => ({ ...state, passwordValidate })),

    nicknamePatternCheck: null,
    setNicknamePatternCheck: (nicknamePatternCheck) => set((state) => ({ ...state, nicknamePatternCheck })),
    nicknameValidate: null,
    setNicknameValidate: (nicknameValidate) => set((state) => ({ ...state, nicknameValidate })),

    telNumberPatternCheck: null,
    setTelNumberPatternCheck: (telNumberPatternCheck) => set((state) => ({ ...state, telNumberPatternCheck })),
    telNumberValidate: null,
    setTelNumberValidate: (telNumberValidate) => set((state) => ({ ...state, telNumberValidate })),
}))
export default useStore;