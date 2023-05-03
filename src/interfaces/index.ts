
export interface IPreviewFestivalItem{
    festivalNumber:number;
    festivalName:string;
    festivalType:string;
    festivalDurationStart: string;
    festivalDurationEnd:string;
    festivalTime:string | null;
    festivalArea:string;
    festivalCost:string;
    onelineReviewAverage: number | null; 
    festivalInformation:string |null;
    festivalImformationUrl:string|null;
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

export interface IPfestivalReviewBoard{
      boardNumber:number;
      boardTitle:string;
      boardContent:string;
      boardImgUrl:string;
      boardWriteDatetime:string;
      viewCount:number;
      recommendCount:number;
      commentCount:number;
      writerId:string;
      writerProfileUrl:number;
      writerNickname:number;
      festivalNumber:number;
    

}

