import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface Props {
  setFestivalList: any;
}

export default function MonthAndAreaButton({ setFestivalList }: Props) {

    const [areaAndMonth, setAreaAndMonth] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [festivalArea, setFestivalArea] = useState<string>('');

    const [selector, setSelector] = useState<number>(0);

    //? const selectedValue를 만들어 Number로 설정해주고
    //? 위의 setSelector에서 selectedValue를 받아주고
    //? setAreaAndMonth에서 String(selecetdValue)를 받아주었다.
    //? 앞에 String을 한 이유는 저렇게 하지 않으면 Number로 처리되기 때문에
    //? 월별, 지역별이 뜨지 않는다.
    const areaAndMonthChange = (event: SelectChangeEvent) => {
      const selectedValue = Number(event.target.value);
      setSelector(selectedValue);
      setAreaAndMonth(String(selectedValue));
      console.log();
    };

    //? back에 있는 API코드를 보고 작성해야함.
    const selectDesignatedMonth = (event: SelectChangeEvent) => {
      setMonth(event.target.value as string);
      const month = Number(event.target.value);

      axios.get(`http://localhost:4040/api/festival/festivalmonth/${month}`)
        .then((response) => getFestivalListResponse(response))
        .catch((error) => console.log(error.message));
    }

    const selectDesignatedArea = (event: SelectChangeEvent) => {
      setFestivalArea(event.target.value as string);
      const festivalArea = String(event.target.value);

      axios.get(`http://localhost:4040/api/festival/${festivalArea}`)
        .then((response) => getFestivalAreaListResponse(response))
        .catch((error) => console.log(error.message));
    }

    //? 이것은 back-end에서 그냥 Response를 받아왔기 때문에 data.festivalList로 받아왔다.
    const getFestivalListResponse = (response: AxiosResponse<any, any>) => {
      setFestivalList(response.data.data.festivalList);
    }

    //? 이것은 back엔드에서 List로 받았기 때문에 festivalList가 아닌 data에서 끝난다.
    const getFestivalAreaListResponse = (response: AxiosResponse<any, any>) => {
      setFestivalList(response.data.data);
    }

    return (
        <Box sx={{ pt: '20px', pl: '20px', display: 'flex'}}>
        <Box>
          {/* //? 월별 & 지역별 */}
          <FormControl sx={{ width: '150px', height: '70px'}}>
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
        {/* //? 월별과 지역별을 합쳤음. 
            //? selector를 const로 만들고 useState로 number 지정.
            //? 삼항연산자를 사용해서 1번이면 월별, 2번이라면 지역별 
            //? 아무것도 클릭하지 않았을 시 아무것도 뜨지 않게 함.*/}
        { 
          selector === 1 ? (
            <Box>
              <FormControl sx={{ width: '100px', height: '70px', ml: '20px'}}>
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
              <FormControl sx={{ width: '100px', height: '70px', ml: '20px'}}>
                <InputLabel>지역별</InputLabel>
                <Select
                  id="Area"
                  value={festivalArea}
                  label="festivalArea"
                  onChange={selectDesignatedArea}
                >
                  <MenuItem value={"서울"}>서울</MenuItem>
                  <MenuItem value={"인천"}>인천</MenuItem>
                  <MenuItem value={"서산"}>서산</MenuItem>
                  <MenuItem value={"춘천"}>춘천</MenuItem>
                  <MenuItem value={"여주"}>여주</MenuItem>
                  <MenuItem value={"원주"}>원주</MenuItem>
                  <MenuItem value={"속초"}>속초</MenuItem>
                  <MenuItem value={"강릉"}>강릉</MenuItem>
                  <MenuItem value={"동해"}>동해</MenuItem>
                  <MenuItem value={"대전"}>대전</MenuItem>
                  <MenuItem value={"군산"}>군산</MenuItem>
                  <MenuItem value={"김천"}>김천</MenuItem>
                  <MenuItem value={"대구"}>대구</MenuItem>
                  <MenuItem value={"포항"}>포항</MenuItem>
                  <MenuItem value={"목포"}>목포</MenuItem>
                  <MenuItem value={"광주"}>광주</MenuItem>
                  <MenuItem value={"여수"}>여수</MenuItem>
                  <MenuItem value={"통영"}>통영</MenuItem>
                  <MenuItem value={"부산"}>부산</MenuItem>
                  <MenuItem value={"울산"}>울산</MenuItem>
                  <MenuItem value={"제주도"}>제주도</MenuItem>
                  <MenuItem value={"진주"}>진주</MenuItem>
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
