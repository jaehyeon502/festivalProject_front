import React from 'react'
import { Avatar, Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import { IPfestivalReviewBoard } from 'src/interfaces';

interface Props {
    festivalBoardList: IPfestivalReviewBoard
}

export default function FestivalRiviewBoardList({ festivalBoardList }: Props) {


    return (
        <Card variant='outlined' >
            <CardActionArea sx={{ m: '10px, 0', display: 'flex', justifyContent: 'space-between', p: '15px', backgroundColor: '#ffffff' }} >
                <Box sx={{ height: '200px', display: 'flex', justifyContent: 'start', flexDirection: 'column' }}>
                    <Box  sx={{ display: 'flex' }}>
                        <Avatar sx={{width:'70px',height:'70px',mb:'10px',justifyContent:'center'}} src={festivalBoardList.writerProfileUrl ? festivalBoardList.writerProfileUrl : ''} />
                        <Box sx={{ height:'70px',display: 'flex', justifyContent:'center', alignItems:'center' }}>
                            <Typography sx={{ m: '10px', fontSize: '17px', fontWeight: 700 }}>{festivalBoardList.writerNickname}  </Typography>
                            <Typography sx={{ m: '10px', fontSize: '17px', fontWeight: 700 }}>작성일:{festivalBoardList.boardWriteDatetime}  </Typography>
                            <Typography sx={{ m: '10px', fontSize: '17px', fontWeight: 700 }}>조회수:{festivalBoardList.viewCount}     </Typography>
                            <Typography sx={{ m: '10px', fontSize: '17px', fontWeight: 700 }}>댓글수:{festivalBoardList.commentCount}      </Typography>
                            <Typography sx={{ m: '10px', fontSize: '17px', fontWeight: 700, }}>좋아요:{festivalBoardList.recommendCount} </Typography>
                        </Box>
                        <Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex' }}>
                        <Box >
                        </Box>
                        <Typography sx={{ fontWeight: 900, fontSize: '20px',mt:'5px',mb:'5px' }}>{festivalBoardList.boardTitle}</Typography>
                        <Box>
                        </Box>
                    </Box>
                    <Divider  />
                    <Box>
                        <Typography sx={{ fontSize: '17px', fontWeight: 700 }}>{festivalBoardList.boardContent}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box component={'img'} src={festivalBoardList.writerProfileUrl as string} sx={{ height: '200px', width: '200px', borderRadius: '5%' }}></Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
