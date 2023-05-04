import React from 'react'
import { Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import { IPreviewFestivalItem } from 'src/interfaces';

interface Props{
    festivalList:IPreviewFestivalItem
}

export default function FestivalListItem({ festivalList }: Props) {

    return (
        <Card variant='outlined' >
            <CardActionArea sx={{ m: '20px,0px,20px ', display: 'flex', justifyContent: 'center', p: '15px', backgroundColor: '#ffffff'  }} >
                <Box>
                    <Box >
                        <Typography sx={{fontWeight:900,fontSize:'25px',m:'10px'}}>{festivalList.festivalName}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{m:'10px' ,fontSize:'17px',fontWeight:700}}>개요:{festivalList.festivalType} 기간:{festivalList.festivalDurationStart}~{festivalList.festivalDurationEnd} 시간:{festivalList.festivalTime}</Typography>
                        <Typography sx={{m:'10px' ,fontSize:'17px',fontWeight:700}}>장소:{festivalList.festivalArea} 요금:{festivalList.festivalCost} 관광객평점:{festivalList.onelineReviewAverage}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{m:'10px' ,fontSize:'17px',fontWeight:700,lineHeight:'30px'}}>{festivalList.festivalInformation}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box component={'img'} src={festivalList.festivalImformationUrl as string} sx={{ ml: '10px',height: '200px', width: '200px', borderRadius: '5%' }}></Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
