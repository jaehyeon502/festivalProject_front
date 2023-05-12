import { useEffect, useState } from "react";
import { GetInterstFestivalListResponseDto } from "src/apis/response/festival";
import { IComment, IPreviewFestivalItem, IPreviewFestivalSimpleListItem, IReviewBoard } from "src/interfaces";

const usePagingHook = (COUNT: number) => {
    const [festivalList, setFestivalList] = useState<(GetInterstFestivalListResponseDto | IPreviewFestivalSimpleListItem | IPreviewFestivalItem | IComment | IReviewBoard)[]>([]);
    const [viewList, setViewList] = useState<(GetInterstFestivalListResponseDto | IPreviewFestivalSimpleListItem | IPreviewFestivalItem | IComment | IReviewBoard)[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1); 

    const onPageHandler = (page: number) => {
        
        setPageNumber(page);
        const templist: (GetInterstFestivalListResponseDto | IPreviewFestivalSimpleListItem | IPreviewFestivalItem | IComment | IReviewBoard)[] = [];
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