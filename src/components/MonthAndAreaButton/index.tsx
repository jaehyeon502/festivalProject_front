import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ResponseDto from "src/apis/response";
import { GetAllFestivalListResponseDto, } from "src/apis/response/festival";
import { GET_ALL_FESTIVAL_LIST, } from "src/constants/api";

interface Props {
  setFestivalList: any;
}

export default function MonthAndAreaButton({ setFestivalList }: Props) {
  //         HOOK           //
  const [areaAndMonth, setAreaAndMonth] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [festivalArea, setFestivalArea] = useState<string>('');

  const [selector, setSelector] = useState<number>(0);

  //       EVENT HANDLER       //
  const areaAndMonthChange = (event: SelectChangeEvent) => {
    const selectedValue = Number(event.target.value);
    setSelector(selectedValue);
    setAreaAndMonth(String(selectedValue));
    console.log();
  };

  const selectDesignatedMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
    const month = Number(event.target.value);

    axios.get(`http://localhost:4040/api/festival/festivalmonth/${month}`)
      .then((response) => getFestivalMonthListResponse(response))
      .catch((error) => console.log(error.message));
  }

  const selectDesignatedArea = (event: SelectChangeEvent) => {
    setFestivalArea(event.target.value as string);
    const festivalArea = String(event.target.value);

    axios.get(`http://localhost:4040/api/festival/area/${festivalArea}`)
      .then((response) => getFestivalAreaListResponse(response))
      .catch((error) => console.log(error.message));
  }

  const allFestivalList = () => {
    axios.get(GET_ALL_FESTIVAL_LIST)
      .then((response) => getAllFestivalListResponseHandler(response))
      .catch((error) => getAllFestivalListErrorHandler(error))
  }

  //           RESPONSE HANDLER         //
  const getFestivalMonthListResponse = (response: AxiosResponse<any, any>) => {
    setFestivalList(response.data.data.festivalList);
  }

  const getFestivalAreaListResponse = (response: AxiosResponse<any, any>) => {
    setFestivalList(response.data.data);
  }

  const getAllFestivalListResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetAllFestivalListResponseDto[]>
    if (!result || data === null) return;
    const now = dayjs().format('YYYY-MM-DD');
    const filteredData = data.filter((item) => item.festivalDurationEnd >= now);
    setFestivalList(filteredData);
  }

  const getAllFestivalListErrorHandler = (error: any) => {
    console.log(error.message);
  }

  //              Use Effect           //
  useEffect(() => {
    allFestivalList();
  }, []);

  return (
    <Box sx={{ pt: '20px', pl: '20px', display: 'flex' }}>
      <Box>
        <FormControl sx={{ width: '150px', height: '70px' }}>
          <InputLabel>월별 & 지역별</InputLabel>
          <Select
            id="areaAndMonth"
            value={areaAndMonth}
            label="월별 & 지역별"
            onChange={areaAndMonthChange}
          >
            <MenuItem value={1}>월별</MenuItem>
            <MenuItem value={2}>지역별</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {
        selector === 1 ? (
          <Box>
            <FormControl sx={{ width: '100px', height: '70px', ml: '20px' }}>
              <InputLabel>월별</InputLabel>
              <Select
                id="Month"
                value={month}
                label="Month"
                onChange={selectDesignatedMonth}
              >
                <MenuItem value={1}>1월</MenuItem>
                <MenuItem value={2}>2월</MenuItem>
                <MenuItem value={3}>3월</MenuItem>
                <MenuItem value={4}>4월</MenuItem>
                <MenuItem value={5}>5월</MenuItem>
                <MenuItem value={6}>6월</MenuItem>
                <MenuItem value={7}>7월</MenuItem>
                <MenuItem value={8}>8월</MenuItem>
                <MenuItem value={9}>9월</MenuItem>
                <MenuItem value={10}>10월</MenuItem>
                <MenuItem value={11}>11월</MenuItem>
                <MenuItem value={12}>12월</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : selector === 2 ? (
          <Box>
            <FormControl sx={{ width: '100px', height: '70px', ml: '20px' }}>
              <InputLabel>지역별</InputLabel>
              <Select
                id="Area"
                value={festivalArea}
                label="festivalArea"
                onChange={selectDesignatedArea}
              >
                <MenuItem value={"서울"}>서울</MenuItem>
                <MenuItem value={"인천"}>인천</MenuItem>
                <MenuItem value={"대전"}>대전</MenuItem>
                <MenuItem value={"대구"}>대구</MenuItem>
                <MenuItem value={"광주"}>광주</MenuItem>
                <MenuItem value={"부산"}>부산</MenuItem>
                <MenuItem value={"울산"}>울산</MenuItem>
                <MenuItem value={"세종"}>세종</MenuItem>
                <MenuItem value={"경기"}>경기</MenuItem>
                <MenuItem value={"충북"}>충북</MenuItem>
                <MenuItem value={"충남"}>충남</MenuItem>
                <MenuItem value={"경북"}>경북</MenuItem>
                <MenuItem value={"경남"}>경남</MenuItem>
                <MenuItem value={"전남"}>전남</MenuItem>
                <MenuItem value={"전북"}>전북</MenuItem>
                <MenuItem value={"강원"}>강원</MenuItem>
                <MenuItem value={"제주"}>제주</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <></>
        )
      }
    </Box>
  )
}
