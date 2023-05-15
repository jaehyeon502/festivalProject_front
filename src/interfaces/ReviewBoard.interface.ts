
interface ReviewBoard{

    boardNumber: number;
    boardTitle: string;
    boardContent: string;
    boardImgUrl: string | null;
    boardWriteDatetime: string;
    viewCount: number;
    recommendCount: number;
    commentCount: number;
    writerId: string;
    writerProfileUrl: string | null;
    writerNickname: string;
    festivalNumber: number;

}
export default ReviewBoard;

