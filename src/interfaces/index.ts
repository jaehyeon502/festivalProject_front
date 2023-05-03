
export interface IPreviewFestivalItem{
    festivalNumber:number;
    festivalName:string;
    festivalType:string;
    festivalDurationStart: string;
<<<<<<< HEAD
    festivalDurationEnd: string;
    festivalTime: string | null;
    festivalArea: string;
    festivalCost: string | null;
    onelineReviewAverage: number | null;
    festivalInformationUrl : string,
    festivalInformation : string
=======
    festivalDurationEnd:string;
    festivalTime:string | null;
    festivalArea:string;
    festivalCost:string;
    onelineReviewAverage: number | null; 
    festivalInformation:string |null;
    festivalImformationUrl:string|null;
>>>>>>> c7f05a1ebbcd2db250af8c4851406d8e4f19e1ee
}

export interface IUser {
    id: string;
    password: string;
    profileUrl: string;
    nickname: string;
    telNumber: string;
    adminCheck: boolean | null;
    reportUser: boolean | null;
    interestedFestival: string | null;
}

export interface IBoard {
    boardNumber: number;
    boardTitle: string;
    boardContent: string;
    boardImgUrl: string | null;
    boardWriteDatetime: string;
    viewCount: number;
    recommendCount: number;
    commentCount: number;
    writerId: string;
    writerProfileUrl: string | null;
    writerNickname: string;
    festivalNumber: number;
}

export interface IComment {
    numbercommentNumber: number;
    commentContent: string;
    numberboardNumber: number;
    writerId: string;
    writeDatetime: string;
    writerProfileUrl: string | null;
    writerNickname: string;
}

export interface IInterstedFestival {
    numbersequence: number;
    userId: string;
    interestedFestivalType: string;
}

export interface IOneLineReview {
    festivalNumber: number;
    userId: string;
    average: number;
    oneLineReviewContent: string;
    userProfileUrl: string | null;
    userNickname: string;
    writeDatetime: string;
}

export interface IRecommend {
    userId: string;
    boardNumber: number;
    userProfileUrl: string | null;
    userNickname: string;
}

export interface ISearchwordLog {
    sequence: number;
    searchWord: string;
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

