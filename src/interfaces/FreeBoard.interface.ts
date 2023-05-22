interface FreeBoard {
    boardNumber: number;
    boardTitle: string;
    boardContent: string;
    boardImgUrl: string | null;
    boardWriteDatetime: string;
    viewCount: number;
    recommendCount: number;
    commentCount: number;
    writerUserId: string;
    writerProfileUrl: string | null;
    writerNickname: string;
}

export default FreeBoard;