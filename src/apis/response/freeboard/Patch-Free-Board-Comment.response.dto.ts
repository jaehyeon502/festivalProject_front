interface ResponseDto {
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
    commentList:[
        {
            commentNumber: number;
            commentContent: string;
            boardNumber: number;
            writerUserId: string;
            writeDatetime: string;
            writerProfileUrl: string | null;
            writerNickname: string;
        }
    ];
    recommendList:[
        {
            userId: String;
            boardNumber: number;
            userProfileUrl: String | null;
            userNickname: String;
        }
    ];
}
export default ResponseDto;