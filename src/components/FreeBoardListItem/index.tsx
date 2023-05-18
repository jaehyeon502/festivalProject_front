import React from 'react'
import { Box, Card, CardActionArea, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { FreeBoard } from 'src/interfaces';
import { GetFreeBoardListResponseDto } from 'src/apis/response/freeboard';

interface Props {
    item : GetFreeBoardListResponseDto;
}

export default function FreeBoardListITem({item} : Props) {
  
    //        Hook          //
    const navigator = useNavigate();

    return (
        <Card variant = 'outlined' sx = {{ mb : '10px'}}>
            <CardActionArea sx ={{ display : 'flex', justifyContent : 'start', p : '10px'}} onClick = {() => navigator(`/freeBoard/detail/${item.freeBoardNumber}`)}>
                <Box>
                <Box component={'img'} src = {item.freeBoardImgUrl ? item.freeBoardImgUrl : ''} sx = {{ height : '200px', width : '220px', borderRadius : '12px'}} />
                </Box>
                <Box sx = {{ ml : '12px', border : '1px solid', width : '1020px', height : '190px', borderRadius : '22px'}}>
                    <Box display='flex' sx = {{ ml : '10px', mt : '25px'}}>
                        <Typography sx = {{ fontSize : '18px', fontWeight : 550, mr : '10px'}}>{item.freeBoardTitle} |</Typography>
                        <Typography sx = {{ fontSize : '18px', mr : '10px'}}>{item.writerNickname} |</Typography>
                        <Typography sx = {{fontSize : '18px'}}>{item.freeBoardWriteDatetime} </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', ml : '12px', mr : '12px', mt : '100px'}}>
                        <Typography sx = {{ fontSize : '18px', fontWeight : 550}}>{item.freeBoardContent}</Typography>
                        <Box display='flex'>
                            <Typography sx = {{ mr : '12px'}}>추천 {item.recommendCount}</Typography>
                            <Typography sx = {{ mr : '12px'}}>댓글 {item.commentCount}</Typography>
                            <Typography>조회수 {item.viewCount}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
