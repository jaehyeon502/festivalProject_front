import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Card, CardActionArea, Typography } from "@mui/material";
import { GetFestivalListResponseDto } from "src/apis/response/festival";

interface Props{
    item: GetFestivalListResponseDto
}

export default function FestivalListItem({ item }: Props) {

    const navigator = useNavigate();

    return (
        <Card variant="outlined">
            <CardActionArea sx={{ display: "flex", justifyContent: "space-between", p: "24px", backgroundColor: "#ffffff"}} onClick={() => navigator(`/board/detail/${item.festivalNumber}`)}>
            <Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: "8px" }}>
                  <Avatar alt={item.festivalName} src={item.festivalImgUrl ? item.festivalImgUrl : ''} />
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 500, color: "#000000" }}
                  >
                    {item.festivalName}
                  </Typography>
                  <Typography
                    sx={{
                      mt: "2px",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    {item.festivalDurationStart}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: "16px", mb: "16px" }}>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 500, color: "#000000" }}
                >
                  {item.festivalName}
                </Typography>
              </Box>
            </Box>
            {item.festivalImgUrl && (
              <Box>
                <Box
                  component="img"
                  src={item.festivalImgUrl}
                  sx={{ height: "152px", width: "152px", borderRadius: "5%" }}
                />
              </Box>
            )}
          </CardActionArea>
        </Card>
      );
    }
