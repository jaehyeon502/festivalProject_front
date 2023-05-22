import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFestivalNumberStore, useSignInStore } from 'src/stores';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import { useCookies } from 'react-cookie';
import { AppBar, IconButton } from '@mui/material';

const pages = ['축제 후기 게시판', '자유 게시판'];

function NavigationBar() {
  //             HOOK               //
  const navigator = useNavigate();
  const {signInUser,resetSignInUser}=useSignInStore();
  const { setFestivalNumber } = useFestivalNumberStore();
  const [cookies,setCookie]=useCookies();
  const accessToken=cookies.accessToken;

  
//        Response Handler        //////
  const logOutClickHandler=()=>{
    setCookie('accessToken',' ',{expires:new Date(),path:'/'})
    resetSignInUser();
    navigator('/')

  }
  const onClickBoardListNameHandler = (boardName : string) => {
    setFestivalNumber(null);
    if(boardName === '축제 후기 게시판') navigator('/reviewBoard/list');
    else if(boardName === '자유 게시판') navigator('/freeBoard/list');
    else return;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#32383f', color:'#000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 900, letterSpacing: '.0.1rem', fontSize:'20px', color: '#eee', textDecoration: 'none', cursor:'pointer'}} onClick={ () =>navigator('/') }>{'FestivalProject'}</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (<Button onClick = {() => onClickBoardListNameHandler(page)} key={page} sx={{ my: 2, color: '#eee', display: 'block',fontSize:'14px' }}>{page}</Button>))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
              { accessToken ?
            ( <><Button variant='contained' sx={{backgroundColor:'#eee', color:'#32383f', fontSize:'14px', fontWeight:900}} onClick={() => navigator('/mypage')}>My Page</Button>
              <Button variant='contained' sx={{ml:'20px',backgroundColor:'#eee', color:'#32383f', fontSize:'14px', fontWeight:900}} onClick={logOutClickHandler}>Logout</Button></>
            ):(<Button variant='contained' sx={{backgroundColor:'#eee', color:'#32383f', fontSize:'14px', fontWeight:900}} onClick={() => navigator('/auth')}>Login</Button>)
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;