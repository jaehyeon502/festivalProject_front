interface ResponseDto {
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
    freeBoardCommentList:[
        {
            freeBoardCommentNumber: number;
            freeBoardCommentContent: string;
            freeBoardNumber: number;
            writerId: string;
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
export default ResponseDto;