import { useEffect, useState } from "react";
import { IPreviewFestivalItem, IPreviewFestivalSimpleListItem } from "src/interfaces";

const usePagingHook = (COUNT: number) => {
    const [festivalList, setFestivalList] = useState<(IPreviewFestivalItem | IPreviewFestivalSimpleListItem)[]>([]);
    const [viewlist, setViewList] = useState<(IPreviewFestivalItem | IPreviewFestivalSimpleListItem)[]>([]);
    const [pagenumber, setPageNumber] = useState<number>(1);


    const onpageHandler = (page: number) => {
        setPageNumber(page);
        const temlist: (IPreviewFestivalItem | IPreviewFestivalSimpleListItem)[] = [];
        const startindex = COUNT * (page - 1);
        const endindex = COUNT * page - 1;
        for (let i = startindex; i <= endindex; i++) {
            if (festivalList.length < i + 1) break;
            temlist.push(festivalList[i]);
            console.log(page)
        }
        setViewList(temlist);
    }

    useEffect(() => {
        onpageHandler(pagenumber);
    }, [festivalList])

    return { festivalList, viewlist, pagenumber, onpageHandler, COUNT, setFestivalList }
}

export default usePagingHook;