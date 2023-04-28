import React from 'react'
import Box from '@mui/material/Box';
import MainLeftContent from './MainLeftContent';
import MainRightContent from './MainRightContent';
import FestivalBoard from './FestivalBoard';

export default function MainContent() {
  return (
    <>
      <Box sx={{ width: '100%', height: '500px', display:'flex', justifyContent: 'center'}}>
          <Box sx={{ width:'80vw', height:'500px', display: 'flex' }}>
              <MainLeftContent />
              <MainRightContent />
          </Box>
      </Box>
      <Box sx={{ width: '100%', height: '400px', display:'flex', justifyContent: 'center'}}>
          <Box sx={{width: '80vw', height:'400px', dsiplay:'flex'}}>
              <FestivalBoard />
          </Box>
      </Box>
    </>
  )
}