import React from 'react'
import Box from '@mui/material/Box';
import MainLeftContent from './MainLeftContent';
import MainRightContent from './MainRightContent';
import FestivalBoard from './FestivalBoard';
import { IPreviewFestivalItem } from '../../../interfaces';


export default function MainContent() {
  return (
    <>
      <Box sx={{ width: '100%', height: '500px', display:'flex', justifyContent: 'center'}}>
          <Box sx={{ width:'80vw', height:'500px', display: 'flex' }}>
              <MainLeftContent/>
              <MainRightContent/>
          </Box>
      </Box>
      <Box sx={{ width: '100%', height: '800px', display:'flex', justifyContent: 'center'}}>
          <Box sx={{width: '80vw', height:'800px', dsiplay:'flex'}}>
              <FestivalBoard />
          </Box>
      </Box>
    </>
  )
}