interface User{
    userId:string;
    password:string;
    nickname:string;
    telNumber:string;
    profileUrl?:string;
    interestedFestivalType?: string[];
}
export default User;
