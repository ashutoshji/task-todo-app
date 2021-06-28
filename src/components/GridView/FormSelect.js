import React from 'react';

import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import '../../styles/GridView/formSelect.css';

// const classes = makeStyles(theme => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));
  
  

export default function FormSelect() {

// const FormSelect = styled.div`
//     display: flex;
//     flex-direction: column;
//     flex: 1;
//     background-color: #fafafa;
//     padding: 22px;
//     margin-bottom: 10px;
//     margin-left: 15px;
//     margin-right: 10px;
//     border-radius: 5px;
//     box-shadow: 0px 1px 1px rgba(0, 0, 0, .4);
// `
  return (
    <React.Fragment>
      <FormControl className="form-select-container">
        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
        //   value={age}
        //   onChange={handleChange}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>Bug</MenuItem>
          <MenuItem value={20}>Feature</MenuItem>
          <MenuItem value={30}>Task</MenuItem>
        </Select>
        <FormHelperText>What type of task is this</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
}

