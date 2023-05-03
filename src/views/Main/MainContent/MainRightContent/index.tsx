import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { FestivalList, OneLineReviewList } from '../../../../mock'
import { IOneLineReview, IPreviewFestivalItem } from '../../../../interfaces'
import OneLineReviewListItem from '../../../../components/OneLineReviewListItem';
import FestivalNameItem from '../../../../components/FestivalNameItem';



export default function MainRightContent() {

  const [ oneLineReviewList, setOneLineReviewList] = useState<IOneLineReview[]>();
  const [ festivalName, setFestivalName] = useState<IPreviewFestivalItem[]>();

  //? useEffect가 실행되면서 mock에 있는 OneLineReviewList 데이터를 oneLineReviewList(useState)에 List 형태로 저장
  //? 이후 return에서 oneLineReviewList를 map으로 돌면서 저장된 인덱스를 하나씩 꺼내온다.
  useEffect(() => {
      setOneLineReviewList(OneLineReviewList);
      setFestivalName(FestivalList);
  }, [])

  return (
    <Box sx={{ width: '40%', height: '100%', backgroundColor:'beige', border : 1 }}>
      <Typography sx = {{ ml : '30px', mt : '15px', fontSize : '20px', fontWeight : 900}}> 
       [축제명 (좌측 축제 정보 리스트 만들어지면 최상단 축제명 가져올 곳)] 한 줄 평가</Typography>

      <Box sx = {{ height : '80%' , mt : '15px', ml : '30px', mr : '30px', overflow : 'hidden'}}>
        {oneLineReviewList?.map((item) => (
        <Grid sx = {{ border : 1, mt : '5px', backgroundColor : '#f0ffff'}}>
          <OneLineReviewListItem oneLineReviewItem = {item}/>
        </Grid>))}
      </Box>
    </Box>
  )
}
