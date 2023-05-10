import { Box, Card, CardActionArea, Divider, Typography } from "@mui/material"
import { IPreviewFestivalItem } from "src/interfaces"

interface Props{

    onClick: () => void;
    item :IPreviewFestivalItem;
}

export default function FestivalSimpleListItem({ onClick, item }: Props) {

    return (
        <Card variant='outlined' onClick={onClick}>
            <CardActionArea sx={{  display: 'flex', justifyContent: 'space-between', p: '15px', backgroundColor: '#ffffff'  }} >
                <Box>
                    <Box>
                        <Typography sx={{ ml: '10px' ,fontWeight:800, fontSize:'15px'}}>{item.festivalName}</Typography>
                        <Box>
                            <Divider sx={{ m: '2px'}}/>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{m:'10px' ,fontSize:'13px',fontWeight:400}}>기간 : {item.festivalDurationStart} ~ {item.festivalDurationEnd}</Typography>
                        <Typography sx={{m:'10px' ,fontSize:'13px',fontWeight:400}}>장소 : {item.festivalArea} </Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box component={'img'} src={item.festivalInformationUrl as string} sx={{ ml: '10px',height: '60px', width: '60px', borderRadius: '5%' }}></Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
