import React from 'react'
import { IPreviewFestivalItem } from '../../interfaces'
import { Avatar, Box, Divider, Typography } from '@mui/material';

interface Props{
    festivalNameItem : IPreviewFestivalItem;
}

export default function FestivalNameItemList( {festivalNameItem} : Props) {

  return (
    <Box>
      <Typography>{festivalNameItem.festivalName}</Typography>
        
    </Box>
  )
}
