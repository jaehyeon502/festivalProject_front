import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export default function MonthAndAreaButton() {

    const [areaAndMonth, setAreaAndMonth] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [area, setArea] = useState<string>('');

    const [selector, setSelector] = useState<number>(0);

    const [MonthSelect, setMonthSelect] = useState<number>(0);

    //? const selectedValue를 만들어 Number로 설정해주고
    //? 위의 setSelector에서 selectedValue를 받아주고
    //? setAreaAndMonth에서 String(selecetdValue)를 받아주었다.
    //? 앞에 String을 한 이유는 저렇게 하지 않으면 Number로 처리되기 때문에
    //? 월별, 지역별이 뜨지 않는다.
    const areaAndMonthChange = (event: SelectChangeEvent) => {
      const selectedValue = Number(event.target.value);
      setSelector(selectedValue);
      setAreaAndMonth(String(selectedValue));
    };

    const monthChange = (event: SelectChangeEvent) => {
      setMonth(event.target.value as string);
    };

    const areaChange = (event: SelectChangeEvent) => {
      setArea(event.target.value as string);
    }

    //? back에 있는 API코드를 보고 작성해야함.
    // const SelectDesignatedNumber = (event: SelectChangeEvent) => {
    //   const SelectMonth = Number(event.target.value);
    //   setMonthSelect(Number(event.target.value));
    //   if(SelectMonth === 1)
    // }

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
                  onChange={monthChange}
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
                  value={area}
                  label="Area"
                  onChange={areaChange}
                >
                  <MenuItem value={1}>서울</MenuItem>
                  <MenuItem value={2}>인천</MenuItem>
                  <MenuItem value={3}>서산</MenuItem>
                  <MenuItem value={4}>춘천</MenuItem>
                  <MenuItem value={5}>여주</MenuItem>
                  <MenuItem value={6}>원주</MenuItem>
                  <MenuItem value={7}>속초</MenuItem>
                  <MenuItem value={8}>강릉</MenuItem>
                  <MenuItem value={9}>동해</MenuItem>
                  <MenuItem value={10}>대전</MenuItem>
                  <MenuItem value={11}>군산</MenuItem>
                  <MenuItem value={12}>김천</MenuItem>
                  <MenuItem value={13}>대구</MenuItem>
                  <MenuItem value={14}>포항</MenuItem>
                  <MenuItem value={15}>목포</MenuItem>
                  <MenuItem value={16}>광주</MenuItem>
                  <MenuItem value={17}>여수</MenuItem>
                  <MenuItem value={18}>통영</MenuItem>
                  <MenuItem value={19}>부산</MenuItem>
                  <MenuItem value={20}>울산</MenuItem>
                  <MenuItem value={21}>제주도</MenuItem>
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
