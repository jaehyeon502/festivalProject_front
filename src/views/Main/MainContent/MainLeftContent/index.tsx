import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, FormControl, Grid, IconButton, IconButtonProps, InputLabel, Link, MenuItem, Pagination, Select, SelectChangeEvent, Stack, Typography, styled } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react'
import FestivalSimpleListItem from 'src/components/FestivalSimpleListItem';
import MonthAndAreaButton from 'src/components/MonthAndAreaIButton';
import { usePagingHook } from 'src/hooks';
import { IPreviewFestivalSimpleListItem } from 'src/interfaces';
import { SIMPLELIST } from 'src/mock';
import { useFestivalStore } from 'src/stores';
import { getpagecount } from 'src/utils';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
interface Props {
  clickPage: boolean;
  setClickPage: React.Dispatch<React.SetStateAction<boolean>>
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MainLeftContent({ setClickPage, clickPage }: Props) {


  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const { festival, setFestival } = useFestivalStore();
  const [festivalArea, setFestivalArea] = useState<string>('');

  const [selectedFestival, setSelectedFestival] = useState<IPreviewFestivalSimpleListItem | null>(null);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  //? onFestivalItemClick를 만들어 festival에 IPreviewFestivalSimpleListItem 데이터를 넣고
  //? setSelectedFestival에 festival을 넣어준다.
  const onFestivalItemClick = (festival: IPreviewFestivalSimpleListItem) => {
    setSelectedFestival(festival);
    setClickPage(true);
  }

  const getFestivalAreaList = (response: AxiosResponse<any, any>) => {
    setFestivalArea(response.data.data.festivalList);
  }

  // const searchArea = (festival: IPreviewFestivalSimpleListItem) => {
  //   //? 내일 이거 물어보자 get으로 어떻게 해야할지
  //   setFestivalArea(festival);
  //   setClickPage(true);

  //   axios.get(`http://localhost:4040/api/festival/${festivalArea}`)
  //     .then((response) => getFestivalAreaList(response))
  //     .catch((error) => console.log(error.message));
  // }

  useEffect(() => {
    setFestivalList(SIMPLELIST);
  }, []);

  return (
    //? 전체 테이블

    <Box sx={{ width: '55%', height: '100%', mr: '5%', backgroundColor: '' }}>
      <Box sx={{ pt: '20px', pl: '20px', display: 'flex' }}>
        <MonthAndAreaButton setFestivalList={setFestivalList} />
      </Box>
      <Box sx={{ m: '10px', backgroundColor: '#FFFFFF' }}>
        <Box sx={{ pt: '10px', pb: '10px', m: '10px' }}>
          <Grid container spacing={1}>
            {/* //? Grid에 xs={6}을 넣어서 2행 2열을 만듦. */}
            {viewList.map((item) => (
              <Grid item xs={6}>
                {/*<FestivalSimpleListItem item={item as IPreviewFestivalSimpleListItem} /> */}
                {/*<FestivalSimpleListItem item={item as IPreviewFestivalSimpleListItem} /> */}
              </Grid>))}
          </Grid>
          {clickPage ? (
            <Box>
              기본정보
              <Box>
                <Box sx={{ width: '5px', height: '20px', backgroundColor: '#fafb99', mt: '20px' }}>
                  <Typography sx={{ ml: '20px' }}>개요</Typography>
                  <Typography>sd</Typography>
                </Box>
              </Box>
            </Box>)

            : (
              <Box>
                <Box sx={{ pt: '20px', pl: '20px', display: 'flex' }}>
                  <MonthAndAreaButton setFestivalList={setFestivalList} />
                </Box>
                <Box sx={{ m: '10px', backgroundColor: '#FFFFFF' }}>
                  <Box sx={{ pt: '10px', pb: '10px', m: '10px' }}>
                    <Grid container spacing={1}>
                      {/* //? Grid에 xs={6}을 넣어서 2행 2열을 만듦. */}
                      {viewList.map((item) => (<Grid item xs={6}><FestivalSimpleListItem item={item as IPreviewFestivalSimpleListItem} onClick={() => setClickPage(true)} /></Grid>))}
                    </Grid>
                  </Box>
                </Box>
                <Box sx={{ pt: '20px', display: 'flex', justifyContent: 'center' }}>
                  <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
                </Box>
              </Box>
            )}

        </Box>
      </Box>
    //? selectedFestival를 만들어서 true이면 실행
      <Box sx={{ width: '55%', height: '100%', mr: '5%', backgroundColor: '' }}>
        {clickPage && selectedFestival ? (
          <Card sx={{ maxWidth: "100%" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '40px', ml: '5px' }}></Box>
              <CardHeader sx={{ display: 'block' }}
                title={selectedFestival.festivalName}
              />
              <Box sx={{ mt: '12px', mr: '5px' }}>
                <IconButton onClick={() => setClickPage(false)}>
                  <RestartAltIcon />
                </IconButton>
              </Box>
            </Box>
            <CardMedia sx={{ margin: 'auto', height: '80%', width: '80%' }}
              component="img"
              src={selectedFestival.festivalInformationUrl as string}
            />
            <CardContent>
              <Box>
                <Typography sx={{ fontSize: '14px', ml: '20px', mt: '10px' }}>기간 : {selectedFestival.festivalDurationStart} ~ {selectedFestival.festivalDurationEnd}</Typography>
                <Typography sx={{ fontSize: '14px', ml: '20px', mt: '10px' }}>장소 : {selectedFestival.festivalArea}</Typography>
                <Typography sx={{ fontSize: '14px', ml: '20px', mt: '10px' }}>요금 : {selectedFestival.festivalCost}</Typography>
                <Typography sx={{ fontSize: '14px', ml: '20px', mt: '10px' }}>정보 : <Link href='http://nongaefestival.kr/'>{`홈페이지`}</Link></Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Box>
              <Box>
                <Box display='inline'>
                  축제정보
                </Box>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Box>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  천년고도 진주는 예로부터 북평양 남진주라 불릴 정도로 전통예술이 뛰어난 고장으로 유명하다.
                  진주의 뜻있는 문화예술인들은 지역의 훌륭한 전통예술을 기반으로 임진왜란 당시 진주성에서 순국한 논개를 비롯한 7만 민, 관, 군의 충절과 진주정신을 포괄하면서
                  시민들이 동참할 수 있는 전통예술축제를 창제하기로 하고 진주논개제를 개최하였다.
                  진주논개제는 매년 5월 넷째 주 금, 토, 일 3일간에 걸쳐서 호국충절의 성지 진주성에서 개최되며,
                  1868년 당시 진주 목사 정현석이 창제한 것으로서 제향에 악, 가, 무가 포함되고 여성들만이 제관이 될 수 있는 독특한 형식의 제례인 의암별제를 서막으로 진주오광대를 비롯한 민속예술과
                  진주기생들이 남긴 교방문화의 아름다움을 느낄 수 있는 전통문화와 여성을 테마로 한 축제이다. 가장 지역적인 것이 가장 세계적이라는 말이 있다.
                  모름지기 진주논개제는 어느 지역에서도 흉내 낼 수 없는 진주만이 가지고 있는 것들을 소재로 하기 때문에 세계적 축제로서 발전을 기대하며
                  또한 전통예술 위주로 봄에 열리는 논개제는 순수예술 중심으로 가을에 열리는 개천예술제 및 진주남강유등축제와 함께 진주를 문화예술의 고장이란 명성에 걸맞은 축제의 도시로 거듭나게 할 것이다.
                  논개의 충절정신과 전통문화의 올바른 계승보존 및 복원, 의암별제와 탈춤 한마당을 통해 진주만이 가지고 있는 역사와 전통문화를 토대로 한 새로운 지역축제의창조, 지역주민이 주도적으로 참가하는 축제전형을 제시하며
                  지역의 다양한 전통예술을 총망라하여 진주의 독자적인 전통문화 예술제이다.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        )
          : (
            <Box>
              <Box sx={{ pt: '20px', pl: '20px', display: 'flex' }}>
                <MonthAndAreaButton setFestivalList={setFestivalList} />
              </Box>
              <Box sx={{ m: '10px', backgroundColor: '#FFFFFF' }}>
                <Box sx={{ pt: '10px', pb: '10px', m: '10px' }}>
                  <Grid container spacing={1}>
                    {/* //? Grid에 xs={6}을 넣어서 2행 2열을 만듦. */}
                    {viewList.map((item) => (<Grid item xs={6}><FestivalSimpleListItem item={item as IPreviewFestivalSimpleListItem} onClick={() => onFestivalItemClick(item as IPreviewFestivalSimpleListItem)} /></Grid>))}
                  </Grid>
                </Box>
              </Box>
              <Box sx={{ pt: '20px', display: 'flex', justifyContent: 'center' }}>
                <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
              </Box>
            </Box>
          )}
      </Box>
=======

    //? selectedFestival를 만들어서 true이면 실행
    <Box sx={{ width: '55%', height: '100%', mr: '5%', backgroundColor: '' }}>
      {clickPage && selectedFestival ? (
        <Card sx={{ maxWidth: "100%" }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '40px', ml : '5px' }}></Box>
            <CardHeader sx={{ display: 'block'}}
              title={selectedFestival.festivalName}
            />
            <Box sx={{ mt : '12px', mr: '5px'}}>
              <IconButton onClick={() => setClickPage(false)}>
                <RestartAltIcon />
              </IconButton>
            </Box>
          </Box>
          <CardMedia sx={{ margin: 'auto', height: '80%', width: '80%' }}
            component="img"
            src={selectedFestival.festivalInformationUrl as string}
          />
          <CardContent>
            <Box>
              <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>기간 : {selectedFestival.festivalDurationStart} ~ {selectedFestival.festivalDurationEnd}</Typography>
              <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>장소 : {selectedFestival.festivalArea}</Typography>
              <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>요금 : {selectedFestival.festivalCost}</Typography>
              <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>정보 : <Link href='http://nongaefestival.kr/'>{`홈페이지`}</Link></Typography>
            </Box>
          </CardContent>
          <CardActions sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Box>
            <Box>
              <Box display='inline'>
                축제정보
              </Box>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>

          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
              천년고도 진주는 예로부터 북평양 남진주라 불릴 정도로 전통예술이 뛰어난 고장으로 유명하다.
              진주의 뜻있는 문화예술인들은 지역의 훌륭한 전통예술을 기반으로 임진왜란 당시 진주성에서 순국한 논개를 비롯한 7만 민, 관, 군의 충절과 진주정신을 포괄하면서
              시민들이 동참할 수 있는 전통예술축제를 창제하기로 하고 진주논개제를 개최하였다.
              진주논개제는 매년 5월 넷째 주 금, 토, 일 3일간에 걸쳐서 호국충절의 성지 진주성에서 개최되며,
              1868년 당시 진주 목사 정현석이 창제한 것으로서 제향에 악, 가, 무가 포함되고 여성들만이 제관이 될 수 있는 독특한 형식의 제례인 의암별제를 서막으로 진주오광대를 비롯한 민속예술과
              진주기생들이 남긴 교방문화의 아름다움을 느낄 수 있는 전통문화와 여성을 테마로 한 축제이다. 가장 지역적인 것이 가장 세계적이라는 말이 있다.
              모름지기 진주논개제는 어느 지역에서도 흉내 낼 수 없는 진주만이 가지고 있는 것들을 소재로 하기 때문에 세계적 축제로서 발전을 기대하며
              또한 전통예술 위주로 봄에 열리는 논개제는 순수예술 중심으로 가을에 열리는 개천예술제 및 진주남강유등축제와 함께 진주를 문화예술의 고장이란 명성에 걸맞은 축제의 도시로 거듭나게 할 것이다.
              논개의 충절정신과 전통문화의 올바른 계승보존 및 복원, 의암별제와 탈춤 한마당을 통해 진주만이 가지고 있는 역사와 전통문화를 토대로 한 새로운 지역축제의창조, 지역주민이 주도적으로 참가하는 축제전형을 제시하며
              지역의 다양한 전통예술을 총망라하여 진주의 독자적인 전통문화 예술제이다.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      )
        : (
          <Box>
            <Box sx={{ pt: '20px', pl: '20px', display: 'flex' }}>
              <MonthAndAreaButton setFestivalList={setFestivalList} />
            </Box>
            <Box sx={{ m: '10px', backgroundColor: '#FFFFFF' }}>
              <Box sx={{ pt: '10px', pb: '10px', m: '10px' }}>
                <Grid container spacing={1}>
                  {/* //? Grid에 xs={6}을 넣어서 2행 2열을 만듦. */}
                  {viewList.map((item) => (<Grid item xs={6}><FestivalSimpleListItem item={item as IPreviewFestivalSimpleListItem} onClick={() => onFestivalItemClick(item as IPreviewFestivalSimpleListItem)} /></Grid>))}
                </Grid>
              </Box>
            </Box>
            <Box sx={{ pt: '20px', display: 'flex', justifyContent: 'center' }}>
              <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
};
