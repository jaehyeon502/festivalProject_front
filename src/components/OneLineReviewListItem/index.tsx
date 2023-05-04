import React from 'react'
import { IOneLineReview } from '../../interfaces'
import { Avatar, Box, Divider, Typography } from '@mui/material';

interface Props{
    oneLineReviewItem : IOneLineReview
}

export default function OneLineReviewListItem({ oneLineReviewItem } : Props) {

    const backGroundImage = `url(${oneLineReviewItem.userProfileUrl})`;
    const dateGap = Date.now() - Date.parse(oneLineReviewItem.writeDatetime);
    const before = Math.floor(dateGap / (1000 * 60));

  return (
    <Box>
        <Box mb = '8px' display= 'flex' alignItems= 'center'>
            <Avatar sx = {{ width : '40px', height : '40px', m : '4px' }} src = {oneLineReviewItem.userProfileUrl ? oneLineReviewItem.userProfileUrl : ''} />
            <Typography sx = {{ml : '5px'}}>{oneLineReviewItem.userNickname+ " | "}</Typography>
            <Divider orientation='vertical' variant='middle'/>
            <Typography sx = {{ml : '5px'}}>{oneLineReviewItem.average} / 5 {" | "}</Typography>
            <Divider orientation='vertical' variant='middle'/>
            <Typography sx = {{ml : '5px'}}>{oneLineReviewItem.writeDatetime}</Typography>
        </Box>
        <Typography sx = {{ ml : '5px', fontSize : '15px'}}>{oneLineReviewItem.oneLineReviewContent}</Typography>

    </Box>
  )
}
