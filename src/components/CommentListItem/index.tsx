import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { Comment } from 'src/interfaces'

interface Props{
    item : Comment;
}
export default function CommentListItem({item} : Props) {
  return (
    <Box>
        <Box sx = {{ display : 'flex', ml : '20px', mb : '12px'}}>
           <Avatar sx = {{mr : '10px', width : '50px', height : '50px'}} src = {item?.writerProfileUrl ? item?.writerProfileUrl : ''}/>
           <Typography sx = {{mr : '10px'}}>{item?.writerNickname + ' | '}</Typography>
           <Typography sx = {{mr : '10px'}}>{item?.writeDatetime}</Typography>
        </Box>
           <Typography sx = {{fontSize : '17px', ml : '20px', mb : '8px', mt : '8px', mr : '20px'}}>{item.commentContent}</Typography>
    </Box>
    )
}
