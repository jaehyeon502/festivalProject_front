import { useEffect, useState } from "react";
import { IPreviewFestivalItem } from "src/interfaces";

const usePagingHook = (COUNT: number) => {
    const [festivalList, setFestivalList] = useState<(IPreviewFestivalItem)[]>([]);
    const [viewlist, setViewList] = useState<(IPreviewFestivalItem)[]>([]);
    const [pagenumber, setPageNumber] = useState<number>(1);


    const onpageHandler = (page: number) => {
        setPageNumber(page);
        const temlist: (IPreviewFestivalItem)[] = [];
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