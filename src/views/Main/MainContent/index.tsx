import React, {useState} from 'react'
import Box from '@mui/material/Box';
import MainLeftContent from './MainLeftContent';
import MainRightContent from './MainRightContent';
import { IPreviewFestivalItem } from '../../../interfaces';
import FestivalBoard from './FestivalBoard';
import { IPreviewFestivalItem } from 'src/interfaces';


export default function MainContent() {
  const [clickPage, setClickPage] = useState<boolean>(false);
  return (
    <>
      <Box sx={{ mt:'100px', width: '100%', height: 'auto', display:'flex', justifyContent: 'center'}}>
          <Box sx={{ width:'80vw', height:'auto', display: 'flex' }}>
              <MainLeftContent setClickPage={setClickPage} clickPage={clickPage}/>
              <MainRightContent clickPage={clickPage}/>
          </Box>
      </Box>
      <Box sx={{ mt:'150px', width: '100%', display:'flex', justifyContent: 'center'}}>
          <Box sx={{width: '80vw', dsiplay:'flex'}}>
              <FestivalBoard setClickPage={setClickPage} clickPage={clickPage}/>
          </Box>
      </Box>
    </>
  )
}