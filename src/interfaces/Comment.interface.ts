interface Comment{
    commentNumber: number;
    commentContent: string;
    boardNumber: number;
    writerId: string;
    writeDatetime: string;
    writerProfileUrl: string | null;
    writerNickname: string;
}
export default Comment