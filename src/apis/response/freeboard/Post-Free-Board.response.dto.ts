import { FreeBoardComment, FreeBoardRecommend } from "src/interfaces";

interface Dto{
    freeBoard :{
        boardNumber: number;
        boardTitle: string;
        boardContent: string;
        boardImgUrl: string;
        boardWriteDatetime: string;
        viewCount: number;
        recommendCount: number;
        commentCount: number;
        writerUserId: string;
        writerProfileUrl: string;
        writerNickname: string;
    };
    freeBoardCommentList:[
        {
            freeBoardCommentNumber: number;
            freeBoardCommentContent: string;
            freeBoardNumber: number;
            writerUserId: string;
            writeDatetime: string;
            writerProfileUrl: string | null;
            writerNickname: string;
        }
    ];
    freeBoardRecommendList:[
        {
            userId: String;
            freeBoardNumber: number;
            userProfileUrl: String | null;
            userNickname: String;
        }
    ];
}

export default Dto