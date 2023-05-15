import { useEffect, useState } from "react";
import { GetFestivalReveiwBoardListResponseDto, GetMyReviewBoardListResponseDto } from "src/apis/response/board";


import { GetInterstFestivalListResponseDto, GetOneLineReviewResponseDto } from "src/apis/response/festival";
import { Comment, Festival, ReviewBoard } from "src/interfaces";

const usePagingHook = (COUNT: number) => {
    const [festivalList, setFestivalList] = useState<(GetOneLineReviewResponseDto|Comment|GetInterstFestivalListResponseDto  | Festival | GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto|ReviewBoard)[]>([]);
    const [viewList, setViewList] = useState<(GetOneLineReviewResponseDto|Comment|GetInterstFestivalListResponseDto  | Festival | GetFestivalReveiwBoardListResponseDto |GetMyReviewBoardListResponseDto|ReviewBoard)[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1); 

    const onPageHandler = (page: number) => {
        
        setPageNumber(page);
        const templist: (GetOneLineReviewResponseDto|Comment|GetInterstFestivalListResponseDto  | Festival |GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto|ReviewBoard)[] = [];
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