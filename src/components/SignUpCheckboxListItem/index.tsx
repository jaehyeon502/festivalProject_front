import React,{useState} from 'react'

import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import { IPreviewFestivalItem } from 'src/interfaces';


interface Props {
    festivalCheckboxList: IPreviewFestivalItem;
}

export default function SignUpCheckboxListItem({festivalCheckboxList} : Props) {


  return (
    <Box>
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
            <FormControlLabel
            value="end"
            control={<Checkbox />}
            label={festivalCheckboxList.festivalType}
            labelPlacement="end"
            />
            </FormGroup>
        </FormControl>
    </Box>
  )
}
