import { Box, Link, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box maxWidth='auto' sx={{ height: "auto" , backgroundColor : "#666666", display : 'flex'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection:'column', p: '40px 120px 50px 120px'  }}>
        <Box>
          <Typography sx={{ fontSize:'20px', fontWeight:'400', color:'#ffffff' }}>Festival Project</Typography>
        </Box>
        <Box component='span' sx={{ fontSize:'12px', fontWeight:'400', color:'#FFDCDCDC' }}>
          <Typography>ProjectDuration : 2023-04-26 ~ 2023-05-26</Typography>
          <Typography>Design & Implement : hyesung6516@naver.com, hide4321@naver.com, dlackdtjq0@naver.com, opopyu@naver.com</Typography>
          <Typography sx={{ color:'#fafafa' }}>우리의 프로젝트에 대해서 궁금하다면? - <Link sx={{ color:'#fafafa' }} href='https://github.com/jaehyeon502/festivalProject_front'>{`Front-End Page`}
                      </Link><Link sx={{ color:'#fafafa' }} href='https://github.com/jaehyeon502/festivalProject_back'> | {`Back-End Page`}
                      </Link></Typography>
        </Box>
      </Box>
    </Box>
  )
}