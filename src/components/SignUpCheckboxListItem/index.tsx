import React from 'react'

import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import { Festival } from 'src/interfaces';
import { useSignUpStore } from 'src/stores';


interface Props {
    festivalCheckboxList: Festival;
}

export default function SignUpCheckboxListItem({festivalCheckboxList} : Props) {

  const {interestedFestival, setInterestedFestival} = useSignUpStore();

  const checkedItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    if (!value) return;
    const checkBoxItem: string = festivalCheckboxList.festivalType;
    console.log(checkBoxItem);
      setInterestedFestival([checkBoxItem]);
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
