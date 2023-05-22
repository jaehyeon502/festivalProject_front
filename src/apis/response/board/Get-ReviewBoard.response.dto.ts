import { Comment } from "src/interfaces";
import Recommend from "src/interfaces/Recommend.interface";

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
    };

    recommendList : Recommend[]
    commentList: Comment[]

}

export default Dto