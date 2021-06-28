import React from 'react'

import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import '../../styles/GridView/input.css'
import '../../styles/GridView/formSelect.css';
import '../../styles/GridView/formButton.css'

const Container = styled.form`
    height: min-content;
    margin-top: 1vh;
    width: 18%;
    margin: 8px;
    background-color: #ebecf0;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    font-size: 12px;
    border: 1px solid lightgrey;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, .9);
    border-radius: 3px;
    @media (max-width: 600px) {
        margin-left: 3%!important;
        width: 80%!important;
    }
    @media (max-width: 768px) {
        width: 250px;
        margin: 2px;
    }
`

const Title = styled.h3`
    padding-top: 20px;
    padding-bottom: 10px;
    font-family: 'Lato', Georgia, 'Times New Roman', Times, serif;
    font-size: 1.1rem;
    margin-left: 10%;
    margin-top: 90%;
    font-weight: 700;
    color: #333;
    text-transform: capitalize;
`

export default class Form extends React.Component {
    state = {
        title: '',
        type: 'task',
        status: 'todo',
        open: false
      }

      onSubmit(event) {
        event.preventDefault();
        if(!this.state.title || this.state.title.length<=3){
            alert('task cant be empty or less than 3 characters')
            return false
        }
        this.props.onSubmit({
          title: this.state.title,
          type: this.state.type,
          status: this.state.status
        });
        document.querySelector('.form').reset()
      }

    render() {
        return (
            <Container onSubmit={this.onSubmit.bind(this)} className="form">
                <Title>Add New Task</Title>
                <input 
                    className="form-input" 
                    placeholder="Enter a title for this card..."
                    value={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                    >
                </input>
                <FormControl className="form-select-container">
                    <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.type}
                    onChange={e => this.setState({ type: e.target.value })}
                    >
                    <MenuItem value="">
                    </MenuItem>
                    <MenuItem value='bug'>Bug</MenuItem>
                    <MenuItem value='feature'>Feature</MenuItem>
                    <MenuItem value='task'>Task</MenuItem>
                    </Select>
                    <FormHelperText>What type of task is this</FormHelperText>
                </FormControl>
            <Button variant="contained" className="form-button" type="submit">Add Task</Button>
            </Container>
        )
    }
}