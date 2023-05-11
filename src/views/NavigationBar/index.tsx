import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignInStore } from 'src/stores';

const pages = ['현재 진행 중인 축제', '개최 예정 축제', '축제  후기', '자유 게시판'];

function NavigationBar() {
  const path = useLocation();
  const navigator = useNavigate();

  const {signInUser}=useSignInStore();
  

  return (
    <AppBar position="static" sx={{ backgroundColor: '#32383f', color:'#000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 900, letterSpacing: '.0.1rem', fontSize:'20px', color: '#eee', textDecoration: 'none', cursor:'pointer'}}>FestivalProject</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (<Button key={page} sx={{ my: 2, ml:'5%' , color: '#eee', display: 'block',fontSize:'12px', fontWeight:900 }}>{page}</Button>))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {path.pathname !== '/auth/sign-in' && path.pathname !== '/auth/sign-up' ? <Button sx={{ backgroundColor:'#fff', color: '#32383f', fontSize:'12px', fontWeight:900 }} variant = 'contained' onClick = {() => navigator('/auth/sign-in') }>{signInUser ? 'Logout' : 'Login'}</Button> : <></>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
