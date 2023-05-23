import React, { useEffect } from 'react'
import { OneLineReview } from '../../interfaces'
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { GetOneLineReviewResponseDto } from 'src/apis/response/festival';
import { useFestivalNumberStore } from 'src/stores';

interface Props{

    oneLineReviewItem : GetOneLineReviewResponseDto

}

export default function OneLineReviewListItem({ oneLineReviewItem } : Props) {
const {setFestivalNumber} = useFestivalNumberStore();
    const dateGap = Date.now() - Date.parse(oneLineReviewItem?.writeDatetime);

const usefestivalNumer = ()=>{
  setFestivalNumber(oneLineReviewItem.festivalNumber);
}

// useEffect(()=>{
//   usefestivalNumer();
// },[])

  return (
    <Box>
      <Box sx={{ padding:'10px' }}>
          <Box mb = '5px' display= 'flex' alignItems= 'center'>
              <Avatar sx = {{ width : '40px', height : '40px', m : '4px', cursor:'pointer' }} src = {oneLineReviewItem?.userProfileUrl ? oneLineReviewItem.userProfileUrl : ''} />
              <Typography sx = {{ml : '5px', fontSize:'12px', color:'#888', cursor:'pointer'}}>{oneLineReviewItem?.userNickname+ " | "}</Typography>
              <Divider orientation='vertical' variant='middle'/>
              <Typography sx = {{ml : '5px', fontSize:'12px', color:'#888'}}>{oneLineReviewItem?.average} / 10 {" | "}</Typography>
              <Divider orientation='vertical' variant='middle'/>
              <Typography sx = {{ml : '5px', fontSize:'12px', color:'#888'}}>{oneLineReviewItem?.writeDatetime}</Typography>
          </Box>
          <Typography sx = {{ ml : '5px', fontSize : '14px', color:'#555'}}>{oneLineReviewItem?.oneLineReviewContent}</Typography>
      </Box>
    </Box>
  )
}
