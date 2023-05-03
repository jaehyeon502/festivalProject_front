import { useEffect, useState } from "react";
import { GetFestivalListResponseDto } from "src/apis/response/festival";

const usePagingHook = (COUNT: number) => {

  const [festivalList, setFestivalList] = useState<(GetFestivalListResponseDto)[]>([]);
  const [viewList, setViewList] = useState<(GetFestivalListResponseDto)[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  //? 한 페이지에 5개의 게시물을 보여주고자 할 때
  //? 배열의 시작 인덱스    5 * pageNumber - 5 -> 5 * (pageNumber - 1)
  //? 배열의 마지막 인덱스  5 * pageNumber - 1

  const onPageHandler = (page: number) => {
    setPageNumber(page);
  
    const tmpList: (GetFestivalListResponseDto)[] = [];

    const startIndex = COUNT * (page - 1);
    const endIndex = COUNT * page - 1;

    for (let index = startIndex; index <= endIndex; index++) {
      if (festivalList.length < index + 1) break;
      tmpList.push(festivalList[index]);
    }

    setViewList(tmpList);
  }

  useEffect(() => {
    onPageHandler(pageNumber);
  }, [festivalList]);

  return {festivalList, viewList, pageNumber, setFestivalList, onPageHandler, COUNT};
}

export default usePagingHook;