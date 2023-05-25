import React from 'react'
import { Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFestivalNumberStore } from 'src/stores';
import { GetInterstFestivalListResponseDto } from 'src/apis/response/festival';
interface Props {
    onClick: () => void;
    festivalList: GetInterstFestivalListResponseDto   
}

export default function InterestedFestivalListItem({ onClick, festivalList }: Props) {
    //                    HOOK                 //
    const { festivalNumber, setFestivalNumber } = useFestivalNumberStore();
    
    return (
        <Card variant='outlined' onClick={onClick} >
            <CardActionArea sx={{ m: '20px,0px,20px ', display: 'flex', justifyContent: 'space-between', p: '15px', backgroundColor: '#ffffff' }} onClick={() => setFestivalNumber(festivalList.festivalNumber)}>
                <Box sx={{ height: '120px', display: 'flex', justifyContent: 'start', flexDirection: 'column' }}>
                    <Box  >
                        <Typography sx={{ fontWeight: 900, fontSize: '14px', m: '10px', color:'#222' }}>{festivalList.festivalName}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{m:'10px' ,fontSize:'11px', color:'#444'}}>개요:{festivalList.festivalType}  기간:{festivalList.festivalDurationStart}~{festivalList.festivalDurationEnd} 시간:{festivalList.festivalTime}</Typography>
                        <Typography sx={{m:'10px' ,fontSize:'11px', color:'#444'}}>장소:{festivalList.festivalArea} 요금:{festivalList.festivalCost} 관광객평점:{festivalList.onelineReviewAverage}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ m: '10px', fontSize: '12px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: '#444' }}>{festivalList.festivalInformation}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ ml: '10px', height: '120px', width: '120px', borderRadius: '5%' }}>
                    <img style={{ 'width':'100%', 'height':'100%' }} src={festivalList.festivalInformationUrl ? festivalList.festivalInformationUrl : ''} />
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}