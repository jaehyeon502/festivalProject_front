interface FreeBoardComment {
    freeBoardCommentNumber: number;
    freeBoardCommentContent: string;
    freeBoardNumber: number;
    writerId: string;
    writeDatetime: string;
    writerProfileUrl: string | null;
    writerNickname: string;
}

export default FreeBoardComment;