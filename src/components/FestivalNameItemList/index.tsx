import { Box, Typography } from '@mui/material';
import { GetFestivalNameListResponseDto } from 'src/apis/response/festival';
interface Props{
    item : GetFestivalNameListResponseDto;
}

export default function FestivalNameItemList( {item} : Props) {
  return (
    <Box>
      <Typography>{item.festivalName}</Typography>
    </Box>
  )
}
