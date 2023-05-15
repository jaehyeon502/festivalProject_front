import { Box, Card, CardActionArea, Divider, Typography } from "@mui/material"
import { IPreviewFestivalItem } from "src/interfaces"
import { useFestivalNumberStore } from "src/stores";

interface Props{
    //? onClick을 누르면 card 클릭했을때 변경이 됨.
    onClick: () => void;
    item :IPreviewFestivalItem;
}



export default function FestivalSimpleListItem({ onClick, item }: Props) {
    const {setFestivalNumber}=useFestivalNumberStore();

    const onClickHandler=()=>{
        onClick();
        setFestivalNumber(item.festivalNumber);
    }


    return (
        <Card variant='outlined' onClick={()=>onClickHandler()}>
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
                        <Typography sx={{m:'10px' ,fontSize:'13px',fontWeight:400}}>평점 : {item.onelineReviewAverage}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box component={'img'} src={item.festivalInformationUrl as string} sx={{ mt: '22px',height: '90px', width: '90px', borderRadius: '5%' }}></Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
