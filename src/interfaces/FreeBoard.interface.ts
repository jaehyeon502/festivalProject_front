interface FreeBoard {
    freeBoardNumber: number;
    freeBoardTitle: string;
    freeBoardContent: string;
    freeBoardImgUrl: string | null;
    freeBoardWriteDatetime: string;
    viewCount: number;
    recommendCount: number;
    commentCount: number;
    writerUserId: string;
    writerProfileUrl: string | null;
    writerNickname: string;
}

export default FreeBoard;