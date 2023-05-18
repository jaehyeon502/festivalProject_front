import { useEffect, useState } from "react";
import { GetAllReviewBoardListResponseDto, GetFestivalReveiwBoardListResponseDto, GetMyReviewBoardListResponseDto, GetReviewBoardResponseDto, PostCommentResponseDto, RecommendReviewBoardResponseDto } from "src/apis/response/board";
import { GetInterstFestivalListResponseDto, GetOneFestivalResponseDto, GetOneLineReviewResponseDto } from "src/apis/response/festival";
import { Comment, Festival, FreeBoard, ReviewBoard } from "src/interfaces";

const usePagingHook = (COUNT: number) => {

    const [festivalList, setFestivalList] = useState<(GetAllReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | FreeBoard)[]>([]);
    const [viewList, setViewList] = useState<(  GetAllReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | FreeBoard)[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    

    const onPageHandler = (page: number) => {

        setPageNumber(page); 
        const templist: ( GetAllReviewBoardListResponseDto | GetOneLineReviewResponseDto | Comment | GetInterstFestivalListResponseDto | Festival | GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto | GetReviewBoardResponseDto | ReviewBoard | FreeBoard)[] = [];
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