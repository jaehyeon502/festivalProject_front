import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FESTIVALLIST, ONELINEREVIEW_LIST } from "../../../../mock";
import { IOneLineReview, IPreviewFestivalItem } from "../../../../interfaces";
import OneLineReviewListItem from "../../../../components/OneLineReviewListItem";
import FestivalNameItem from "../../../../components/FestivalNameItemList";

interface Props {
  clickPage: boolean;
}

export default function MainRightContent({ clickPage }: Props) {
  const [oneLineReviewList, setOneLineReviewList] =
    useState<IOneLineReview[]>();
  const [festivalName, setFestivalName] = useState<IPreviewFestivalItem[]>();

  //? useEffect가 실행되면서 mock에 있는 OneLineReviewList 데이터를 oneLineReviewList(useState)에 List 형태로 저장
  //? 이후 return에서 oneLineReviewList를 map으로 돌면서 저장된 인덱스를 하나씩 꺼내온다.
  useEffect(() => {
    setOneLineReviewList(ONELINEREVIEW_LIST);
    setFestivalName(FESTIVALLIST);
  }, []);

  return (
    <Box sx={{ width: "40%", height: "100%" }}>
      <Typography
        sx={{
          ml: "30px",
          mt: "15px",
          fontSize: "24px",
          fontWeight: 900,
          color: "#222",
        }}
      >
        한줄평
      </Typography>
      {clickPage ? (
        <Box>index</Box>
      ) : (
        <Box sx={{ mt: "15px", ml: "30px", mr: "30px", overflow: "hidden" }}>
          {oneLineReviewList?.map((item) => (
            <Grid
              sx={{
                border: "1px solid #dedede",
                borderRadius: "10px",
                mt: "15px",
              }}
            >
              <OneLineReviewListItem oneLineReviewItem={item} />
            </Grid>
          ))}
        </Box>
      )}
    </Box>
  );
}
