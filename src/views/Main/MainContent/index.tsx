import React, {useState} from 'react'
import Box from '@mui/material/Box';
import MainLeftContent from './MainLeftContent';
import MainRightContent from './MainRightContent';
import FestivalBoard from './FestivalBoard';


export default function MainContent() {
  const [clickPage, setClickPage] = useState<boolean>(false);
  return (
    <>
      <Box sx={{ mt:'100px', width: '100%', height: 'auto', display:'flex', justifyContent: 'center'}}>
          <Box sx={{ width:'80vw', height:'auto', display: 'flex' }}>
              <MainLeftContent setClickPage={setClickPage} clickPage={clickPage}/>
              <MainRightContent/>
          </Box>
      </Box>
      <Box sx={{ mt:'150px', width: '100%', display:'flex', justifyContent: 'center'}}>
          <Box sx={{width: '80vw', dsiplay:'flex'}}>
              <FestivalBoard />
          </Box>
      </Box>
    </>
  )
}