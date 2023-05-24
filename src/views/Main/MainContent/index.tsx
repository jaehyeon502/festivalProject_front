import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import MainLeftContent from './MainLeftContent';
import MainRightContent from './MainRightContent';
import FestivalBoard from './FestivalBoard';
import { useLocation } from 'react-router-dom';
import { GetOneFestivalResponseDto } from 'src/apis/response/festival';

export default function MainContent() {
  
  //          Hook           //
  const [clickPage, setClickPage] = useState<boolean>(false);
  
  const [selectedFestival, setSelectedFestival] = useState<GetOneFestivalResponseDto | null>(null);
  const path = useLocation();

  //          use Effect           //
  useEffect(() => {
    setClickPage(false);
  }, [path])
  
  return (
    <>
      <Box sx={{ mt:'100px', width: '100%', height: 'auto', display:'flex', justifyContent: 'center'}}>
          <Box sx={{ width:'80vw', height:'auto', display: 'flex' }}>
              <MainLeftContent setClickPage={setClickPage} clickPage={clickPage} selectedFestival={selectedFestival} setSelectedFestival={setSelectedFestival} />
              <MainRightContent clickPage={clickPage} setSelectedFestival={setSelectedFestival}/>
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