import React from 'react'

import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

import '../../styles/GridView/input.css'
import '../../styles/GridView/formSelect.css';
import '../../styles/GridView/formButton.css'
import '../../styles/GridView/modal.css'

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    display: none;
    z-index: 999!important;
    height: 100%;
    cursor: default;
    background: rgba(0, 0, 0, 0.5);
`
const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const Container = styled.div`
    position: fixed;
    background: #ebecf0;
    width: 500px;
    height: auto;
    display: flex;
    z-index: 999!important;
    flex-direction: column;
    font-size: 12px;
    top: 30%;
    left: 50%;
    border-radius: 3px;
    border: 1px solid lightgrey;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, .9);
    transform: translate(-50%,-50%);
    @media (max-width: 600px) {
        width: 80%;
        top: 15%;
        left: 50%;
        margin-left: -5%;
        height: 300px;
    }
`
const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    height: 10px;
    margin-top: 1%;
    width: 90%;
    margin-left: 5%; 
    padding-bottom: 30px;
`

const Title = styled.h3`
    padding-top: 20px;
    flex: 0;
    padding-bottom: 10px;
    font-family: 'Lato', Georgia, 'Times New Roman', Times, serif;
    font-size: 1.4rem;
    flex: 1;
    margin-left: 5%;
    margin-top: 90%;
    font-weight: 700;
    color: #333;
    text-transform: capitalize;
`

export default class Modal extends React.Component {
    state = {
        title: '',
        type: '',
      }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            type: nextProps.type,
        });
    }

    titleHandler(e) {
        this.setState({ title: e.target.value });
    }

    typeHandler(e) {
        this.setState({ type: e.target.value });
    }

      handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.onDeleteTask(this.props.index);          
    }
    
    render() {
        return (
            <ModalWrapper className="modal-wrapper">
                <Container 
                 className="modal-form"
                 >
                     <HeaderContainer>
                    <Title>{"Edit task"}</Title>
                    <CancelIcon
                        style={{
                            marginRight: '20px',
                            marginTop: '10px',
                            cursor: 'pointer'
                        }}
                        fontSize='Large'
                        onClick={this.props.onCloseModal}
                    ></CancelIcon>
                     </HeaderContainer>
                    <input 
                        className="modal-form-input" 
                        placeholder="Enter a new title for this card..."
                        value={this.state.value}
                        onChange={(e) => this.titleHandler(e)}>
                    </input>
                    <FormControl className="modal-form-select-container">
                        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={''}
                            onChange={(e) => this.typeHandler(e)}
                        >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value='bug'>Bug</MenuItem>
                        <MenuItem value='feature'>Feature</MenuItem>
                        <MenuItem value='task'>Task</MenuItem>
                        </Select>
                        <FormHelperText>Set new type</FormHelperText>
                    </FormControl>
                    <ButtonsWrapper>
                        <Button 
                            variant="contained" 
                            className="form-button-modal" 
                            type="submit"
                            onClick={() => { this.handleSave() }}
                            >Save Changes</Button>
                        {/* <Button 
                            variant="contained" 
                            className="form-button-modal delete" 
                            type="submit"
                            onClick={this.handleDelete.bind(this)}
                            // onClick={() => this.handleDelete(this.props.index)}
                        >Delete Task</Button> */}
                </ButtonsWrapper>
                </Container>
                
            </ModalWrapper>
        )
    }
}