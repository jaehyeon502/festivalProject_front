import React from 'react'
import { IPreviewFestivalItem } from '../../interfaces'
import { Avatar, Box, Divider, Typography } from '@mui/material';

interface Props{
    item : IPreviewFestivalItem;
}

export default function FestivalNameItemList( {item} : Props) {

  return (
    <Box>
      <Typography>{item.festivalName}</Typography>
        
    </Box>
  )
}
