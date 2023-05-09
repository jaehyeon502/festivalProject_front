import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

import SigninView from './SigninView'
import SignUpView from './SignUpView'
import { FESTIVALLIST } from 'src/mock';
import FestivalListItem from 'src/components/FestivalListItem';
import { usePagingHook } from 'src/hooks';
import { GetInterstFestivalListResponseDto } from 'src/apis/response/festival';

export default function AuthenticationView() {

  const [ AuthenticationView, setAuthenticationView] = useState<boolean>(true);
  const{festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList }=usePagingHook(2);
  // const [festivalList, setFestivalList] = useState<IPreviewFestivalItem[]>([]);

  useEffect(() => {
    setFestivalList(FESTIVALLIST);
  }, []);

  return (
    <Box sx={{ padding:"0 120px" }}>
      <Grid container spacing={2}>
        <Grid item lg={5.5} sm={12}>
          <Box sx={{ display: 'flex', flexDirection:'column', justifyContent:'center', height: '100%',backgroundColor: "#dedede" }}>
            {viewList.map((festivalItem) => (<FestivalListItem festivalList={festivalItem as GetInterstFestivalListResponseDto } />))}
          </Box>
        </Grid>
        <Grid item lg={6.5} sm={12}>
          <Card sx={{ height: '630px', mt: '100px', mb: '80px', padding: '50px' }}>
            {AuthenticationView ? (<SigninView setAuthenticationView={setAuthenticationView} />) : (<SignUpView />)}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
