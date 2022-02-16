import {Box, Checkbox, Typography} from '@mui/material';
import React from 'react';

export const PublicationPreview = (props) => {
  return <Box sx={{display: "flex", alignItems: "center"}}>
    <Checkbox onChange={() => props.setActivePubs(curr => [...curr, props.uid])} />
    <Typography>{props.uid} : {props.title}</Typography>
  </Box>
}
export default PublicationPreview;
