import React from 'react'

import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import { IPreviewFestivalItem } from 'src/interfaces';
import { useSignUpStore } from 'src/stores';


interface Props {
    festivalCheckboxList: IPreviewFestivalItem;
}

export default function SignUpCheckboxListItem({festivalCheckboxList} : Props) {

  const {profileUrl, setProfileUrl} = useSignUpStore();

  const checkedItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    if (!value) return;
    setProfileUrl(festivalCheckboxList.festivalType);
  }

  return (
    <Box>
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
            <FormControlLabel
            value="end"
            control={<Checkbox onChange={(event) => checkedItem(event)}/>}
            label={festivalCheckboxList.festivalType}
            labelPlacement="end"
            />
            </FormGroup>
        </FormControl>
    </Box>
  )
}
