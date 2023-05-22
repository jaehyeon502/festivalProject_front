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
            writerUserId: String
            writeDatetime: String
            writerProfileUrl: String | null;
            writerNickname: String
        }
    ]

    festivalBoard: {
        festivalNumber: number;
        festivalName: string;
        festivalType: string;
        festivalDurationStart: string;
        festivalDurationEnd: string;
        festivalTime: string;
        festivalArea: string;
        festivalCost: string;
        onlineReviewAverage: number;
        festivalInformation: string;
        festivalInformationUrl: string;
        festivalHomepage: string
    }
}

export default Dto