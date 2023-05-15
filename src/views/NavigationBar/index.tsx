import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSignInStore } from 'src/stores';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import { useCookies } from 'react-cookie';
import { AppBar, IconButton } from '@mui/material';

const pages = ['현재 진행 중인 축제', '개최 예정 축제', '축제 후기', '자유 게시판'];

function NavigationBar() {
  //             HOOK               //
  const navigator = useNavigate();
  const {signInUser,resetSignInUser}=useSignInStore();
  const [cookies,setCookie]=useCookies();
  const accessToken=cookies.accessToken;

  
//        Response Handler        //////
  const logOutClickHandler=()=>{
    setCookie('accessToken',' ',{expires:new Date(),path:'/'})
    resetSignInUser();
    navigator('/')

  }
  const onClickBoardListNameHandler = (boardName : string) => {
    if(boardName === '현재 진행 중인 축제') alert('현진축 게시판');
    else if(boardName === '개최 예정 축제') alert('개예축 게시판')
    else if(boardName === '축제 후기') navigator('/reviewBoard/list');
    else if(boardName === '자유 게시판') alert('자유 게시판');
    else return;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#32383f', color:'#000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 900, letterSpacing: '.0.1rem', fontSize:'20px', color: '#eee', textDecoration: 'none', cursor:'pointer'}}>FestivalProject</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (<Button onClick = {() => onClickBoardListNameHandler(page)} key={page} sx={{ my: 2, color: '#eee', display: 'block',fontSize:'14px' }}>{page}</Button>))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
              { accessToken ?
            ( <><Button variant='contained' sx={{backgroundColor:'#eee', color:'#32383f', fontSize:'14px', fontWeight:900}} onClick={() => navigator('/mypage')}>My Page</Button>
              <IconButton onClick={logOutClickHandler}><PowerOffIcon/></IconButton></>
            ):(<Button variant='contained' sx={{backgroundColor:'#eee', color:'#32383f', fontSize:'14px', fontWeight:900}} onClick={() => navigator('/auth')}>Login</Button>)
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;