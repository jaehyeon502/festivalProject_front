import { Box, Card, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Link, Typography, styled } from "@mui/material";
import { Festival } from "src/interfaces";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import React, { useState } from "react";

interface Props{
    setClickPage: React.Dispatch<React.SetStateAction<boolean>>
    item: Festival;
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

export default function FestivalOnclickChangeItem({ setClickPage, item }: Props) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }


    return (
        <Card sx={{ maxWidth: "100%" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '40px', ml : '5px' }}></Box>
            <CardHeader sx={{ display: 'block'}}
                title={item.festivalName}  
            />
            <Box sx={{ mt : '12px', mr: '5px'}}>
              <IconButton onClick={() => setClickPage(false)}>
                <RestartAltIcon />
              </IconButton>
            </Box>
          </Box>
          <CardMedia sx={{ margin: 'auto', height: '80%', width: '80%' }}
            component="img"
            src={item.festivalInformationUrl as string}
          />
          <CardContent>
            <Box>
              <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>기간 : {item.festivalDurationStart} ~ {item.festivalDurationEnd}</Typography>
              <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>장소 : {item.festivalArea}</Typography>
              <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>요금 : {item.festivalCost}</Typography>
              <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>평점 : {item.onelineReviewAverage}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize:'14px', ml: '20px', mt: '10px' }}>정보 : <Link href={item.festivalHomepage}>{`홈페이지`}</Link></Typography>
                  <Box>
                    <Box sx={{ fontSize:'14px'}} display='inline'> 축제정보 </Box>
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                    </ExpandMore>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Box sx={{whiteSpace: 'pre-wrap'}}>
                <Typography paragraph>
                  {item.festivalInformation}
                </Typography>
              </Box>
              
            </CardContent>
          </Collapse>
        </Card>
    )
}