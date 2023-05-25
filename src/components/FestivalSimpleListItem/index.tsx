import { Box, Card, CardActionArea, Divider, Typography } from "@mui/material"
import { GetOneFestivalResponseDto } from "src/apis/response/festival";
import { useFestivalNumberStore } from "src/stores";

interface Props{
    //? onClick을 누르면 card 클릭했을때 변경이 됨.
    onClick: () => void;
    item : GetOneFestivalResponseDto;
}

export default function FestivalSimpleListItem({ onClick, item }: Props) {
    const {setFestivalNumber} = useFestivalNumberStore();

    const onClickHandler = () => {
        onClick();
        setFestivalNumber(item.festivalNumber);
    }

    console.log(item.onelineReviewAverage);

    return (
        <Card variant='outlined' onClick={() => onClickHandler()}>
            <CardActionArea sx={{  display: 'flex', justifyContent: 'space-between', p: '7px', backgroundColor: '#ffffff'  }} >
                <Box>
                    <Box>
                        <Typography sx={{ ml: '10px' ,fontWeight:800, fontSize:'14px', color:'#222'}}>{item.festivalName}</Typography>
                        <Box>
                            <Divider sx={{ m: '2px'}}/>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{m:'5px' ,fontSize:'11px',fontWeight:400, color: '#444'}}>기간 : {item.festivalDurationStart} ~ {item.festivalDurationEnd}</Typography>
                        <Typography sx={{m:'5px' ,fontSize:'11px',fontWeight:400, color: '#444'}}>장소 : {item.festivalArea} </Typography>
                        <Typography sx={{m:'5px' ,fontSize:'11px',fontWeight:400, color: '#444'}}>평점 : {item.onelineReviewAverage}</Typography>
                        <Box>
                            <Divider />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ mt: '22px',height: '90px', width: '90px', borderRadius: '5%' }}>
                    <img src={item.festivalInformationUrl ? item.festivalInformationUrl : ''} />
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
