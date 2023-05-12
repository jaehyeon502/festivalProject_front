import { Box, Card, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'

import SigninView from './SigninView'
import { FESTIVALLIST } from 'src/mock';
import { usePagingHook } from 'src/hooks';

export default function AuthenticationView() {

  const{festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList }=usePagingHook(2);

  useEffect(() => {
    setFestivalList(FESTIVALLIST);
  }, []);

  return (
    <Box sx={{ padding:"0 120px" }}>
      <Grid container spacing={2}>
        <Grid item lg={5.5} sm={12}>
          <Box sx={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height: '100%' }}>
            <Typography sx={{ mb:'25px', fontSize:'48px', fontWeight:900, color:'#222' }}>축제정보를 제공하는</Typography>
            <Typography sx={{ fontSize:'48px', fontWeight:900, color:'#222' }}> 홈페이지 입니다.</Typography>
          </Box>
        </Grid>
        <Grid item lg={6.5} sm={12}>
          <Card sx={{ height: '590px', mt: '100px', mb: '80px', padding: '50px' }}>
            <SigninView/>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
