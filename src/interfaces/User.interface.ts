interface User{
    userId:string;
    nickname:string;
    telNumber:string;
    profileUrl:string | null;
    interestedFestival?: string[];
}
export default User;
