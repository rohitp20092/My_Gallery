import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function MainPagination(props) {

  return (
    <Stack spacing={2} sx={{padding: '10px', alignItems: 'center'}}>
      <Pagination count={10} color="primary"  page={props.page} onChange={(e,page) => props.onChange(page)}/>
    </Stack>
  );
} 