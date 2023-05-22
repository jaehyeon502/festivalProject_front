interface Comment{
    commentNumber: number;
    commentContent: string;
    boardNumber: number;
    writerUserId: string;
    writeDatetime: string;
    writerProfileUrl: string | null;
    writerNickname: string;
}
export default Comment;