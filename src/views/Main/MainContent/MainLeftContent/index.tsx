import { Box, Grid, IconButton, IconButtonProps, Pagination, SelectChangeEvent, styled } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import {  useEffect, useState } from 'react'
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
import FestivalOnclickChangeItem from 'src/components/FestivalOnclickChangeItem';

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


  return (

<></>
  )
};
