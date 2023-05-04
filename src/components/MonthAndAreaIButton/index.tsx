import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const selects =[ '서울', '인천', '서산', '춘천', '여주', '원주', '속초', '강릉', '동해', '대전', '군산', '김천', '대구', '포항', '목포', '광주', '여수', '통영', '부산', '울산', '제주도' ];
const months = [1,2,3,4,5,6,7,8,9,10,11,12];

export default function MonthAndAreaButton() {

    const [areaAndMonth, setAreaAndMonth] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [area, setArea] = useState<string>('');

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
    };

    const monthChange = (event: SelectChangeEvent) => {
      setMonth(event.target.value as string);
    };

    const areaChange = (event: SelectChangeEvent) => {
      setArea(event.target.value as string);
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
                  onChange={monthChange}
                >
                  {months.map((month) => (<MenuItem key={month}>{month+"월"}</MenuItem>))}
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
                  {selects.map((select) => (<MenuItem key={select}>{select}</MenuItem>))}
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
