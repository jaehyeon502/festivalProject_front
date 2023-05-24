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
            <CardActionArea sx={{ m: '10px, 0', display: 'flex', justifyContent: 'space-between', p: '15px', backgroundColor: '#ffffff' }} onClick={() => navigator(`/reviewBoard/detail/${festivalBoardList.boardNumber}`)} >
                <Box sx={{ height: '200px', display: 'flex', justifyContent: 'start', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Avatar sx={{ width: '70px', height: '70px', mb: '10px', justifyContent: 'center' }} src={festivalBoardList?.writerProfileUrl ? festivalBoardList?.writerProfileUrl : ''} />
                        <Box sx={{ height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={{ m: '10px', fontSize: '12px', fontWeight: 700 }}>{festivalBoardList?.writerNickname}  </Typography>
                            <Typography sx={{ m: '10px', fontSize: '12px', fontWeight: 700 }}>작성일 :{festivalBoardList?.boardWriteDatetime}  </Typography>
                            <Typography sx={{ m: '10px', fontSize: '12px', fontWeight: 700 }}>조회수 :{festivalBoardList?.viewCount}     </Typography>
                            <Typography sx={{ m: '10px', fontSize: '12px', fontWeight: 700 }}>댓글수 :{festivalBoardList?.commentCount}      </Typography>
                            <Typography sx={{ m: '10px', fontSize: '12px', fontWeight: 700, }}>추천 :{festivalBoardList?.recommendCount} </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex' }}>
                        <Box >
                        </Box>
                        <Typography sx={{ fontWeight: 900, fontSize: '20px', mt: '5px', mb: '5px' }}>{festivalBoardList?.boardTitle}</Typography>
                        <Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography sx={{ fontSize: '17px', fontWeight: 700, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: '#444' }}>{festivalBoardList?.boardContent}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box component={'img'} src={festivalBoardList?.boardImgUrl as string} sx={{ height: '200px', width: '200px', borderRadius: '5%' }}></Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
