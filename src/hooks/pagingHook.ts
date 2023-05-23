import { useEffect, useState } from "react";
import { PatchFreeBoardCommentRequestDto } from "src/apis/request/freeboard";
import { GetReviewBoardListResponseDto, GetFestivalReveiwBoardListResponseDto, GetMyReviewBoardListResponseDto, GetReviewBoardResponseDto, PostCommentResponseDto, RecommendReviewBoardResponseDto } from "src/apis/response/board";
import { GetInterstFestivalListResponseDto, GetOneFestivalResponseDto, GetOneLineReviewResponseDto } from "src/apis/response/festival";
import { DeleteFreeBoardCommentResponseDto, GetFreeBoardListResponseDto, GetFreeBoardResponseDto } from "src/apis/response/freeboard";
import { Comment, Festival, FreeBoard, FreeBoardComment, ReviewBoard } from "src/interfaces";

const usePagingHook = (COUNT: number) => {

    const [festivalList, setFestivalList] = useState<(GetReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | GetFreeBoardListResponseDto | FreeBoard | FreeBoardComment | PatchFreeBoardCommentRequestDto)[]>([]);
    const [viewList, setViewList] = useState<(GetReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | GetFreeBoardListResponseDto | FreeBoard | FreeBoardComment | PatchFreeBoardCommentRequestDto)[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    

    const onPageHandler = (page: number) => {

        console.log(festivalList);

        setPageNumber(page); 
        const templist: ( GetReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | GetFreeBoardListResponseDto | FreeBoard | FreeBoardComment | PatchFreeBoardCommentRequestDto)[] = [];
        const startindex = COUNT * (page - 1);
        const endindex = COUNT * page - 1;
        for (let i = startindex; i <= endindex; i++) {
            if (festivalList.length < i + 1) break;
            templist.push(festivalList[i]);
        }
        setViewList(templist);
    }

    useEffect(() => {
        onPageHandler(pageNumber);
    }, [festivalList])

    return { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList}
}

export default usePagingHook;