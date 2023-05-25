import { useEffect, useState } from "react";
import { PatchCommentRequestDto } from "src/apis/request/board";
import { PatchFreeBoardCommentRequestDto } from "src/apis/request/freeboard";
import { GetReviewBoardListResponseDto, GetFestivalReviewBoardListResponseDto, GetMyReviewBoardListResponseDto, GetReviewBoardResponseDto } from "src/apis/response/board";
import { GetInterstFestivalListResponseDto, GetOneLineReviewResponseDto } from "src/apis/response/festival";
import { FreeBoardRecommendResponseDto, GetFreeBoardListResponseDto } from "src/apis/response/freeboard";
import { Comment, Festival, FreeBoard, FreeBoardComment, ReviewBoard } from "src/interfaces";

const usePagingHook = (COUNT: number) => {

    const [festivalList, setFestivalList] = useState<(GetReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReviewBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | GetFreeBoardListResponseDto | FreeBoard | FreeBoardComment | PatchFreeBoardCommentRequestDto | PatchCommentRequestDto | FreeBoardRecommendResponseDto)[]>([]);
    const [viewList, setViewList] = useState<(GetReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReviewBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | GetFreeBoardListResponseDto | FreeBoard | FreeBoardComment | PatchFreeBoardCommentRequestDto | PatchCommentRequestDto | FreeBoardRecommendResponseDto)[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onPageHandler = (page: number) => {

        setPageNumber(page);
        const templist: (GetReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReviewBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | GetFreeBoardListResponseDto | FreeBoard | FreeBoardComment | PatchFreeBoardCommentRequestDto | PatchCommentRequestDto | FreeBoardRecommendResponseDto)[] = [];
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

    return { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList }
}

export default usePagingHook;