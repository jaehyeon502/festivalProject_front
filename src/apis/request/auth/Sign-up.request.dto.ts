interface RequestDto {
    userId: string;
    password: string;
    nickname:string;
    profileUrl:string;
    telNumber: string;
    interestedFestival: string[];
}

export default RequestDto;