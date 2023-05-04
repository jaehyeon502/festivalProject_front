import React from 'react'
import { Avatar, Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import { IPfestivalReviewBoard } from 'src/interfaces';

interface Props{
    festivalBoardList:IPfestivalReviewBoard
}

export default function FestivalRivewBoardList({ festivalBoardList }: Props) {

    // return (
    //     <Card variant='outlined' >
    //         <CardActionArea sx={{ m: '20px,0px,20px ', display: 'flex', justifyContent: 'center', p: '15px', backgroundColor: '#ffffff'  }} >
    //             <Box>
    //                 <Box >
    //                     <Typography sx={{fontWeight:900,fontSize:'25px',m:'10px'}}>{festivalBoardList.boardTitle}</Typography>
    //                     <Box>
    //                         <Divider />
    //                     </Box>
    //                 </Box>
    //                 <Box>
    //                     <Typography sx={{m:'10px' ,fontSize:'17px',fontWeight:700}}>개요:{festivalBoardList.festivalType}  기간:{festivalBoardList.festivalDurationStart}~{festivalBoardList.festivalDurationEnd} 시간:{festivalList.festivalTime}</Typography>
    //                     <Typography sx={{m:'10px' ,fontSize:'17px',fontWeight:700}}>장소:{festivalBoardList.festivalArea} 요금:{festivalBoardList.festivalCost} 관관객평점:{festivalBoardList.onelineReviewAverage}</Typography>
    //                     <Box>
    //                         <Divider />
    //                     </Box>
    //                 </Box>
    //                 <Box>
    //                     <Typography sx={{m:'10px' ,fontSize:'17px',fontWeight:700,lineHeight:'30px'}}>{festivalBoardList.festivalInformation}</Typography>
    //                 </Box>
    //             </Box>
    //             <Box>
    //                 <Box component={'img'} src={festivalBoardList.festivalImformationUrl as string} sx={{ ml: '10px',height: '200px', width: '200px', borderRadius: '5%' }}></Box>
    //             </Box>
    //         </CardActionArea>
    //     </Card>
    // )
}
