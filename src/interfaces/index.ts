import User from "./User.interface";

import ReviewBoard from "./ReviewBoard.interface";
import Comment from "./Comment.interface";
import OneLineReview from "./OndeLineReview.interface";
import Festival from "./Festival.interface";

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
festivalInformationUrl:string|null;
festivalHomepage: string;
}

export interface IPreviewFestivalSimpleListItem { //? 인터페이스 같은 게 왜 2개?
    festivalNumber: number;
    festivalName: string;
    festivalType: string;
    festivalDurationStart: string;
    festivalDurationEnd:string;
    festivalTime:string | null;
    festivalArea:string;
    festivalCost:string;
    onelineReviewAverage: number | null; 
    festivalInformation:string |null;
    festivalInformationUrl:string|null;
    festivalHomepage: string;
}
export interface IUser {
    userId: string;
    password: string;
    profileUrl?: string;
    nickname: string;
    telNumber: string;
    adminCheck?: boolean | null;
    reportUser?: boolean | null;
    interestedFestivalType: string[] | null;
}

export interface IReviewBoard {
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
    commentNumber: number;
    commentContent: string;
    boardNumber: number;
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

export interface IPfestivalReviewBoard { //? 위에 있는 Board와 같은 interface
    boardNumber: number;
    boardTitle: string;
    boardContent: string;
    boardImgUrl: string;
    boardWriteDatetime: string;
    viewCount: number;
    recommendCount: number;
    commentCount: number;
    writerId: string;
    writerProfileUrl: string;
    writerNickname: string;
    festivalNumber: number;
}

export type { User, ReviewBoard, Comment, OneLineReview, Festival }