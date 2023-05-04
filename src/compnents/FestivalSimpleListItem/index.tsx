import { Box, Card, CardActionArea, Divider, Typography } from "@mui/material"
import { IPreviewFestivalItem } from "src/interfaces"

interface Props{
    item :IPreviewFestivalItem
}

export default function FestivalSimpleListItem({ item }: Props) {

    return (
        <Card variant='outlined'>
            <CardActionArea sx={{ m: '20px,0px,20px ', display: 'flex', justifyContent: 'center', p: '15px', backgroundColor: '#ffffff'  }} >
                <Box>
                    <Box >
                        <Typography sx={{fontWeight:500,fontSize:'14px'}}>{item.festivalName}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{m:'10px' ,fontSize:'11px',fontWeight:400}}>기간:{item.festivalDurationStart}~{item.festivalDurationEnd}</Typography>
                        <Typography sx={{m:'10px' ,fontSize:'11px',fontWeight:400}}>장소:{item.festivalArea} </Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box component={'img'} src={item.festivalImformationUrl as string} sx={{ ml: '10px',height: '60px', width: '60px', borderRadius: '5%' }}></Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
