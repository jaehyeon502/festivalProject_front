import { FreeBoardComment, FreeBoardRecommend } from "src/interfaces";

interface Dto{
    freeBoard :{
        freeBoardNumber: number;
        freeBoardTitle: string;
        freeBoardContent: string;
        freeBoardImgUrl: string;
        freeBoardWriteDatetime: string;
        viewCount: number;
        recommendCount: number;
        commentCount: number;
        writerUserId: string;
        writerProfileUrl: string;
        writerNickname: string;
    };

    freeBoardCommentList: FreeBoardComment[];
    freeBoardRecommendList: FreeBoardRecommend[];
}

export default Dto