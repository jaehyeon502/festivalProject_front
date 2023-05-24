import { Box, Card, CardActionArea, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { GetFreeBoardListResponseDto } from 'src/apis/response/freeboard';
interface Props {
    item : GetFreeBoardListResponseDto;
}

export default function FreeBoardListITem({ item } : Props) {

    //        Hook          //
    const navigator = useNavigate();

    return (
        <Card variant = 'outlined' sx = {{ mt: '5px' ,mb : '5px' }}>
            <CardActionArea sx ={{ display : 'flex', justifyContent : 'start', p : '10px'}} onClick = {() => navigator(`/freeBoard/detail/${item.boardNumber}`)}>
                <Box>
                    {item.boardImgUrl ? (<Box component={'img'} src = {item.boardImgUrl} sx = {{ height : '50px', width : '50px', borderRadius : '10%'}} />): (<></>)}
                
                </Box>
                <Box sx = {{ ml : '12px', width : '100%', height : '50px'}}>
                    <Box display='flex' sx = {{ ml : '10px'}}>
                        <Typography sx = {{ fontSize : '14px', mr : '10px', color:'#222'}}>{item.boardTitle} |</Typography>
                        <Typography sx = {{ fontSize : '11px', mr : '10px', color:'#888'}}>{item.writerNickname} |</Typography>
                        <Typography sx = {{ fontSize : '11px', color:'#888'}}>{item.boardWriteDatetime} </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', ml : '12px', mr : '12px', mt : '10px'}}>
                        <Typography sx = {{ fontSize : '11px', color:'#444'}}>{item.boardContent}</Typography>
                        <Box display='flex'>
                            <Typography sx = {{ mr : '12px', fontSize:'11px', color:'#888'}}>추천 {item.recommendCount}</Typography>
                            <Typography sx = {{ mr : '12px', fontSize:'11px', color:'#888'}}>댓글 {item.commentCount}</Typography>
                            <Typography sx = {{ fontSize:'11px', color:'#888'}}>조회수 {item.viewCount}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
