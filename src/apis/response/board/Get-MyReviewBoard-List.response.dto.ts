interface Dto{
    boardNumber: number
    boardTitle: string;
    boardContent: string;
    boardImgUrl: string;
    boardWriteDatetime: string;
    viewCount: number;
    recommendCount: number;
    commentCount: number;
    writerId: string;
    writerProfileUrl: string | null
    writerNickname: string;
    festivalNumber: number;

}

export default Dto;