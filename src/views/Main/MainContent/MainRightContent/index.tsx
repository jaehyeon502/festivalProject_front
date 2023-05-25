import { Box, Button, Card, Grid, Input, Pagination, Rating, Typography } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import OneLineReviewListItem from "src/components/OneLineReviewListItem";
import axios, { AxiosResponse } from "axios";
import ResponseDto from "src/apis/response";
import { usePagingHook } from "src/hooks";

import { GetFestivalNameResponseDto, GetOneFestivalResponseDto, GetOneLineReviewResponseDto, GetTop1OneLineReviewResponseDto, PostOneLineCommentReviewResponseDto } from "src/apis/response/festival";
import { useFestivalNumberStore } from "src/stores";
import { GET_ONELINE_REVIEW_FESTIVALNAME, GET_ONELINE_REVIEW_URL, GET_ONE_FESTIVAL_URL, GET_TOP1_ONELINEREVIEW_URL, POST_ONE_LINE_COMMENT_REVIEW, authorizationHeader } from "src/constants/api";

import { getpagecount } from "src/utils";
import { useCookies } from "react-cookie";
import { PostOneLineCommentRequestDto } from "src/apis/request/festival";

interface Props {
  clickPage: boolean;
  setSelectedFestival: Dispatch<SetStateAction<GetOneFestivalResponseDto | null>>
}

export default function MainRightContent({ clickPage, setSelectedFestival }: Props) {

  //         Hook         //
  const [festivalName, setFestivalName] = useState<GetFestivalNameResponseDto | null>(null);
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const { festivalNumber, setFestivalNumber } = useFestivalNumberStore();

  const [cookies] = useCookies();
  const accessToken = cookies.accessToken;

  const [oneLineReviewContent, setOneLineReviewContent] = useState<string>('');
  const [average, setAverage] = useState<number>(0);


  //         Event Handler         //
  const getOneLineReview = () => {
    axios
      .get(GET_ONELINE_REVIEW_URL(festivalNumber as number))
      .then((response) => getOneLineReviewResponseHandler(response))
      .catch((error) => getOneLineReviewErrorHandler(error))
  }

  const top1OneLineReview = () => {
    axios
      .get(GET_TOP1_ONELINEREVIEW_URL)
      .then((response) => getTop1OneLineReviewResponseHandler(response))
      .catch((error) => getTop1OneLineReviewErrorHandler(error))
  }

  const getFestivalName = () => {
    axios
      .get(GET_ONELINE_REVIEW_FESTIVALNAME(festivalNumber as number))
      .then((response) => getFestivalNameResponseHandler(response))
      .catch((error) => getFestivalNameErrorHandler(error))
  }

  const onPostOneLineCommentHandler = () => {
    if (!accessToken) {
      alert('로그인이 필요합니다!')
      return;
    }

    const data: PostOneLineCommentRequestDto = {
      festivalNumber: festivalNumber as number, oneLineReviewContent, average
    }

    axios.post(POST_ONE_LINE_COMMENT_REVIEW, data, authorizationHeader(accessToken))
      .then((response) => postOneLineCommentResponseHandler(response))
      .catch((error) => postOneLineCommentErrorHandler(error))
  }

  const getOneFestival = (festivalNumber: number) => {
    axios
      .get(GET_ONE_FESTIVAL_URL(festivalNumber))
      .then((response) => getOneFestivalResponseHandler(response))
      .catch((error) => getOnefestivalErrorHandler(error))
  }

  //             Response Handler               ///
  const getOneLineReviewResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetOneLineReviewResponseDto[]>
    if (!result || data === null) return;
    setFestivalList(data)
  }

  const getTop1OneLineReviewResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetTop1OneLineReviewResponseDto[]>
    if (!result || data === null) return;
    setFestivalList(data)
  }

  const getFestivalNameResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetFestivalNameResponseDto>
    if (!result || data === null) return;
    setFestivalName(data);
  }

  const postOneLineCommentResponseHandler = (response: AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<PostOneLineCommentReviewResponseDto>
    if (!result || !data) {
      alert(message);
      return;
    }
    const { oneLineReviewList, festival } = data;
    getOneFestival(festival.festivalNumber)
    setFestivalList(oneLineReviewList);
  }

  const getOneFestivalResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetOneFestivalResponseDto>
    if (!result || !data) return;
    setSelectedFestival(data);
  }

  //        Error handler              //
  const getOneLineReviewErrorHandler = (error: any) => console.log(error.message);
  const getTop1OneLineReviewErrorHandler = (error: any) => console.log(error.message);
  const getFestivalNameErrorHandler = (error: any) => console.log(error.message);
  const postOneLineCommentErrorHandler = (error: any) => console.log(error.message)
  const getOnefestivalErrorHandler = (error: any) => console.log(error.message);

  //          use Effect             //
  useEffect(() => {
    getFestivalName();

    getOneLineReview();
  }, [festivalNumber]);

  useEffect(() => {
    top1OneLineReview();
  }, []);

  return (
    <Box sx={{ width: "40%", height: "100%" }}>
      <Box>
        <Typography

          sx={{ ml: "30px", mt: "15px", fontSize: "24px", fontWeight: 900, color: "#222" }}> {festivalName?.festivalName} 한 줄 평</Typography>
        <Box sx={{ mt: "15px", ml: "30px", mr: "30px", overflow: "hidden" }}>

          {viewList.map((item) => (
            <Box>
              <Grid sx={{ border: "1px solid #dedede", borderRadius: "10px", mt: "15px" }}>
                <OneLineReviewListItem oneLineReviewItem={item as GetOneLineReviewResponseDto} />
              </Grid>
            </Box>
          ))}
          {clickPage ?
            (<Box sx={{ pt: '20px', pb: '15px' }}>
              <Card variant='outlined' sx={{ p: '20px' }}>
                <Card sx={{ border: '1px solid', display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ ml: '10px' }}>평점 : </Typography>
                  <Rating sx={{ ml: '5px' }} name="customized-10" max={10} onChange={(event, value) => setAverage(Number(value))} />
                </Card>
                <Input sx={{ mt: '10px' }} minRows={3} multiline disableUnderline fullWidth onChange={(event) => setOneLineReviewContent(event.target.value)} />
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                  <Button
                    onClick={() => onPostOneLineCommentHandler()}
                    sx={{
                      p: '4px 20px',
                      backgroundColor: '#ffffff',
                      color: 'black',
                      fontSize: '14px',
                      borderRadius: '42px'
                    }} >한줄평 작성</Button>
                </Box>
              </Card>
            </Box>) : (<></>)
          }
        </Box>
        <Box sx={{ pt: '20px', display: 'flex', justifyContent: 'center' }}>
          <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
        </Box>
      </Box>
    </Box>
  )
}

