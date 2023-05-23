import React from 'react'
import { Festival } from '../../interfaces'
import { Avatar, Box, Divider, Typography } from '@mui/material';
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
