import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import '../../styles/GridView/input.css'

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       height: 5,
//       width: 200,
//     },
//   },
// }));

export default function Input() {
//   const classes = useStyles();

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fafafa;
    padding: 22px;
    margin-bottom: 10px;
    margin-left: 15px;
    margin-right: 10px;
    border-radius: 5px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, .4);
`
  return (
    <React.Fragment>
    </React.Fragment>
  );
}

