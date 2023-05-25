import React from 'react'
import { Avatar, Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import { GetFestivalReviewBoardListResponseDto } from 'src/apis/response/board';
import { useNavigate } from 'react-router-dom';
interface Props {
    festivalBoardList: GetFestivalReviewBoardListResponseDto
}
export default function FestivalReviewBoardList({ festivalBoardList }: Props) {

    //    HOOk         //
    const navigator = useNavigate();

    return (
        <Card variant='outlined' >
            <CardActionArea sx={{ m: '10px, 0', display: 'flex', justifyContent: 'space-between', p: '10px', backgroundColor: '#ffffff' }} onClick={() => navigator(`/reviewBoard/detail/${festivalBoardList.boardNumber}`)} >
                <Box sx={{ height: '120px', display: 'flex', justifyContent: 'start', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Avatar sx={{ width: '40px', height: '40px', mb: '10px', justifyContent: 'center' }} src={festivalBoardList?.writerProfileUrl ? festivalBoardList?.writerProfileUrl : ''} />
                        <Box sx={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={{ m: '10px', fontSize: '11px', color: '#666' }}>{festivalBoardList?.writerNickname}  </Typography>
                            <Typography sx={{ m: '10px', fontSize: '11px', color: '#666' }}>작성일 :{festivalBoardList?.boardWriteDatetime}  </Typography>
                            <Typography sx={{ m: '10px', fontSize: '11px', color: '#666' }}>조회수 :{festivalBoardList?.viewCount}     </Typography>
                            <Typography sx={{ m: '10px', fontSize: '11px', color: '#666' }}>댓글수 :{festivalBoardList?.commentCount}      </Typography>
                            <Typography sx={{ m: '10px', fontSize: '11px', color: '#666' }}>추천 :{festivalBoardList?.recommendCount} </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex' }}>
                        <Box >
                        </Box>
                        <Typography sx={{ fontSize: '16px', mt: '5px', mb: '5px', color:'#222' }}>{festivalBoardList?.boardTitle}</Typography>
                        <Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography sx={{ fontSize: '12px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: '#444' }}>{festivalBoardList?.boardContent}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ height: '120px', width: '120px', borderRadius: '5%' }}>
                        <img style={{'width': '100%'}} src={festivalBoardList?.boardImgUrl ? festivalBoardList?.boardImgUrl : ''} />
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
