import React from 'react'

import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'

export default function SignUpCheckboxListItem() {

    const [viewList, setViewList] = useState<

  return (
    <Box>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
        <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="축제"//todo : map메서드 사용해서 축제 타입명 가져오기
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
    </Box>
  )
}
