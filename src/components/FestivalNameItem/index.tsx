import React from 'react'
import { IPreviewFestivalItem } from '../../interfaces'
import { Avatar, Box, Divider, Typography } from '@mui/material';

interface Props{
    festivalNameItem : IPreviewFestivalItem;
}

export default function FestivalNameItem( {festivalNameItem} : Props) {

  return (
    <Box>
        {festivalNameItem.festivalName}
    </Box>
  )
}
