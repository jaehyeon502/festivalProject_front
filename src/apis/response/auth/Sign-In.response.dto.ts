interface Dto {
    userId: string;
    nickname: string;
    profileUrl: string | null;
    telNumber: string;
    expiredTime: number;
    token: string;
    interestedFestival:string[];

}
export default Dto;