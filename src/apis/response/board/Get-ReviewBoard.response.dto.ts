interface Dto {
    reviewBoard: {
        festivalNumber: number;
        festivalName: string;
        festivalType: string;
        festivalDurationStart: string;
        festivalDurationEnd: string;
        festivalTime: string | null;
        festivalArea: string;
        festivalCost: string;
        onelineReviewAverage: number | null;
        festivalInformation: string | null;
        festivalInformationUrl: string | null;
        festivalHomepage: string;
    };

    recommendList:
    [
        {
            userId: String;
            boardNumber: number;
            userProfileUrl: String | null;
            userNickname: String;
        }

    ];
    commentList:
    [
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