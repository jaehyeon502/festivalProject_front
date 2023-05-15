interface User{
    userId:string;
    nickname:string;
    telNumber:string;
    profileUrl:string | null;
    interestedFestivalType?: string[];
}
export default User;
