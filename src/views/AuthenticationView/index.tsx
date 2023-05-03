import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import SigninView from './SigninView'
import SignUpView from './SignUpView'

export default function AuthenticationView() {

  const [ AuthenticationView, setAuthenticationView] = useState<boolean>(true);

  return (
    <Box sx={{ padding:"0 120px" }}>
      <Grid container spacing={2}>
        <Grid item lg={7} sm={12}>
          <Box sx={{ display: 'flex', height: '100%',backgroundColor: "#dedede" }}>
            
          </Box>
        </Grid>
        <Grid item lg={5} sm={12}>
          <Card sx={{ height: '630px', mt: '100px', mb: '80px', padding: '50px' }}>
            {AuthenticationView ? (<SigninView setAuthenticationView={setAuthenticationView} />) : (<SignUpView />)}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
