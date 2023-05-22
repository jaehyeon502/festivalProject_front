interface Dto {
    board: {
        boardNumber: number
        boardTitle: string;
        boardContent: string;
        boardImgUrl: string;
        boardWriteDatetime: string;
        viewCount: number;
        recommendCount: number;
        commentCount: number;
        writerUserId: string;
        writerProfileUrl: string | null
        writerNickname: string;
        festivalNumber: number;
    }

    recommendList: [
        {
            userId: String;
            boardNumber: number;
            userProfileUrl: String | null;
            userNickname: String;
        }
    ]

    commentList: [
        {
            commentNumber: number
            commentContent: String
            boardNumber: number
            writerId: String
            writeDatetime: String
            writerProfileUrl: String | null;
            writerNickname: String
        }
    ]
}

export default Dto