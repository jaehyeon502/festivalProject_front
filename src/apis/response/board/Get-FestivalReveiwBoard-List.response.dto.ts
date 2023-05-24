interface Dto {
    boardContent: string;
    boardImgUrl: string;
    boardNumber: number
    boardTitle: string;
    boardWriteDatetime: string;
    commentCount: number;
    festivalNumber: number;
    recommendCount: number;
    viewCount: number;
    writerUserId: string;
    writerNickname: string;
    writerProfileUrl: string | null
}

export default Dto;