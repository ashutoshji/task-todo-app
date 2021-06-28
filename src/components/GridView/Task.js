import React from 'react';

import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
    padding: 15px;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 5px;
    display: flex;
    z-index: 2!important;
    flex-direction: column;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, .4);
    background-color: ${props => props.isDragging ? '#7FC7A7' : 'white'};
    @media (max-width: 600px) {
        margin-left: 0px;
        width: 80%;
    }
`

const Title = styled.h3`
    font-size: 1rem;
    font-family: 'Lato', Georgia, 'Times New Roman', Times, serif;
    font-weight: 300;
    opacity: .8;
`
const Type = styled.h6`
    font-size: .7rem;
    margin-top: 6px;
    width: min-content;
    position: relative;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
    z-index: 1;
    border-radius: 3px;
    font-family: 'Lato', Georgia, 'Times New Roman', Times, serif;
    font-weight: 600;
    opacity: .9;
`
export default class Task extends React.Component {
    render() {

        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <React.Fragment>
                        <Container
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            index={this.props.index}
                            className="task-container"
                            isDragging={snapshot.isDragging}
                            onClick={(event) => this.props.onShowModal(event, this.props.task.id)}
                        >
                            <Title>{this.props.task.title}</Title>
                            <Type style={
                                {
                                    backgroundColor: `${this.props.task.type === "bug" ?'#DE3C4B' 
                                    : (this.props.task.type === 'task' ? "#F5BB00" : "#4FB286")}`,

                                    color: `${this.props.task.type === 'task' ? '#333648' : '#fafafa'}`
                                }
                            }>{this.props.task.type}</Type>
                        </Container>
                    </React.Fragment>
                )}
            </Draggable>
        )
    }
}