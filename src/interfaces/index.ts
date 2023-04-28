export interface IPreviewFestivalItem{
    festivalNumber:number;
    festivalName:string;
    festivalType:string;
    festivalDurationStart: string;
    festivalDurationEnd:string;
    festivalTime:string | null;
    festivalArea:string;
    festivalCost:boolean | null;
    onelineReviewAverage: number | null; 
}

export interface IUser{
    id: string;
    password:string;
    profileUrl:string;
    nickname:string;
    telNumber:string;
    adminCheck: boolean | null;
    reportUser:boolean | null;
    interestedFestival: string | null;
}