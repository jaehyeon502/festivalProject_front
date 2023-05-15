import { useEffect, useState } from "react";
import { GetFestivalReveiwBoardListResponseDto, GetMyReviewBoardListResponseDto } from "src/apis/response/board";


import { GetInterstFestivalListResponseDto, GetOneLineReviewResponseDto } from "src/apis/response/festival";
import { IComment, IPreviewFestivalItem, IPreviewFestivalSimpleListItem, IReviewBoard } from "src/interfaces";

const usePagingHook = (COUNT: number) => {

    const [festivalList, setFestivalList] = useState<(GetOneLineReviewResponseDto|IComment|GetInterstFestivalListResponseDto | IPreviewFestivalSimpleListItem | IPreviewFestivalItem | GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto|IReviewBoard)[]>([]);
    const [viewList, setViewList] = useState<(GetOneLineReviewResponseDto|IComment|GetInterstFestivalListResponseDto | IPreviewFestivalSimpleListItem | IPreviewFestivalItem | GetFestivalReveiwBoardListResponseDto |GetMyReviewBoardListResponseDto|IReviewBoard)[]>([]);

    const [pageNumber, setPageNumber] = useState<number>(1); 

    const onPageHandler = (page: number) => {
        
        setPageNumber(page);

        const templist: (GetOneLineReviewResponseDto|IComment|GetInterstFestivalListResponseDto | IPreviewFestivalSimpleListItem | IPreviewFestivalItem |GetFestivalReveiwBoardListResponseDto | GetMyReviewBoardListResponseDto|IReviewBoard)[] = [];

        console.log('festivalList');
        console.log(festivalList);
        
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