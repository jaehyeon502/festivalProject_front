import React from 'react'
import { Festival } from '../../interfaces'
import { Avatar, Box, Divider, Typography } from '@mui/material';

interface Props{
    item : Festival;
}

export default function FestivalNameItemList( {item} : Props) {

  return (
    <Box>
      <Typography>{item.festivalName}</Typography>
        
    </Box>
  )
}
