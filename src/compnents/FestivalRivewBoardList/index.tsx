import React from 'react'
import { Avatar, Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import { IPfestivalReviewBoard } from 'src/interfaces';

interface Props {
    festivalBoardList: IPfestivalReviewBoard
}

export default function FestivalRivewBoardList({ festivalBoardList }: Props) {


    return (
        <Card variant='outlined' >
            <CardActionArea sx={{ m: '20px,0px,20px ', display: 'flex', justifyContent: 'center', p: '15px', backgroundColor: '#ffffff' }} >
                <Box>
                    <Box >
                        <Typography sx={{ fontWeight: 900, fontSize: '25px', m: '10px' }}>{festivalBoardList.boardTitle}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                    <Box sx={{display:'flex'}}>
                        <Box sx={{ mr: '8px' }}>
                            <Avatar alt={festivalBoardList.writerNickname} src={festivalBoardList.writerProfileUrl ? festivalBoardList.writerProfileUrl : ''} />
                        </Box>
                        <Typography sx={{ m: '10px', fontSize: '17px', fontWeight: 700 }}>{festivalBoardList.writerNickname}</Typography>
                        <Typography sx={{ m: '10px', fontSize: '17px', fontWeight: 700 }}>작성일:{festivalBoardList.boardWriteDatetime} 조회수:{festivalBoardList.viewCount} 댓글수:{festivalBoardList.commentCount} 추천수:{festivalBoardList.recommendCount}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ m: '10px', fontSize: '17px', fontWeight: 700, lineHeight: '30px' }}>{festivalBoardList.boardContent}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box component={'img'} src={festivalBoardList.boardImgUrl as string} sx={{ ml: '10px', height: '200px', width: '200px', borderRadius: '5%' }}></Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
