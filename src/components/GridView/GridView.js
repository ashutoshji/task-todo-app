import React from 'react';

import '../../styles/GridView/gridView.css'
import '@atlaskit/css-reset'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import Column from './Column'
import Form from '../GridView/Form'
import Modal from './Modal'
import Footer from '../shared/Footer'

const Container = styled.div`
  display: flex;
  margin-top: 7vh;
  width: 95vw;
  margin-left: 2%;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
    overflow-x: hidden;
  }
  @media (max-width: 768px) {
    margin: 2px;
    width: 95vw;
}
`

class GridView extends React.Component {
     state = this.props.state;
     
    //  state = {
    //      ...this.props.state,
    //      duplicateTaskExists: false
    //  }

onEditModal = (index) => {
    this.setState({
        requiredItem: index
    });
}

onCloseModal = () => {
    document.querySelector('.modal-wrapper').style.display = "none";
}

onShowModal = (event, index) => {    
    document.querySelector('.modal-wrapper').style.display = "flex";
    this.setState({
        ...this.state,
        requiredItem: index,
    });
    this.index = index;
}

saveModalDetails = (item) => {
    let tempTask = this.state.tasks;
    const requiredItem = this.index;
    let newTask;
    let duplicateTask
    console.log('item: ', item)
    if (item.title !== undefined) {
        duplicateTask = tempTask.find(element => element.title.toLowerCase() === item.title.toLowerCase());
    }
    console.log('duplicateTask: ', duplicateTask)
    if (!duplicateTask) {
        tempTask.forEach(task => {
            if (task.id === requiredItem) {
                newTask = task
                newTask.title = item.title ? item.title : task.title
                newTask.type = item.type ? item.type : task.type
            }
        })
        this.setState({ 
            ...this.state,
        });
        this.onCloseModal()    
    } else {
        alert('A Task with that name already exists...')
        // this.onCloseModal()    
    }

        

  }

onDragUpdate = update => {
    const {destination} = update;
    const opacity = destination
        ? destination.index / Object.keys(this.state.tasks).length
        : 1;
    document.body.style.backgroundColor = `rgba(152,193,217, ${opacity})`;
}

onDragEnd = (result) => {
    document.body.style.color = 'inherit';
    document.body.style.fontWeight = 'inherit';
    document.body.style.backgroundColor = `inherit`;

    const {destination, source, draggableId, type} = result;

    if (!destination) {
        return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return
    }

    if (type === 'column') {
        const newColumnOrder = Array.from(this.state.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
            ...this.state,
            columnOrder: newColumnOrder,
        };
        this.setState(newState);
        return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)
        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            }
        }
        
        this.setState(newState)
        return
    } 

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
        ...start,
        taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
        ...finish,
        taskIds: finishTaskIds
    };

    const newState = {
        ...this.state,
        columns: {
            ...this.state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
        }
    }
    this.setState(newState);
    return
}

onDeleteTask = (index) => {
    let { tasks, columns } = this.state;

    const taskToDelete = tasks.find(element => element.id === index);
    const columnsArray = []

    let columnWeNeed;
    let columnKey;
    let columnTaskListWeNeed;
    
    for (let key in columns) {
        columnsArray.push(Object.values(columns[key]))
      }

      columnsArray.forEach(column => {
          for (let i=0; i<column.length; i++) {
              if (column[2].includes(index)) {
                  columnWeNeed = column;
                  columnKey = column[0]
                  columnTaskListWeNeed = column[2]
              }
          }
      })

    // tasks.pop(taskToDelete);
    const taskIndex = tasks.indexOf(taskToDelete);
    const newIndex = columnTaskListWeNeed.indexOf(index);

    if (newIndex > -1) {
        columnTaskListWeNeed.splice(newIndex, 1);
    }
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }

    const newColumn = {
        id: columnWeNeed[0],
        title: columnWeNeed[1],
        taskIds: columnTaskListWeNeed
    }
    const newState = {
        ...this.state,
        tasks: tasks,
        columns: {
            ...this.state.columns,
            newColumn
        }
    }

    this.setState(newState);    
    this.onCloseModal()
}

onAddTask = (task) => {
    let { tasks } = this.state;

    task.id = `task-${this.state.tasks.length + 1}`
    let columnOneTaskIds = this.state.columns['column-1'].taskIds; 
    const duplicateTask = tasks.find(element => element.title.toLowerCase() === task.title.toLowerCase());

    // check if task.title is an empty string & if there are no duplicate tasks
    if (task.title.length > 0 && !duplicateTask) {
        tasks.push(task);
        columnOneTaskIds.push(task.id)
        document.querySelector('.form-input').style.border = '0px solid red';
        document.querySelector('.form-input').placeholder= 'Enter a title for this card...';
        document.querySelector('.form-input').classList.remove('error-placeholder')
    } else{ 
        alert('A Task with that name already exists...')
        document.querySelector('.form-input').style.border = '2px solid #DE3C4B';
        document.querySelector('.form-input').placeholder= 'Please enter a title...';
        document.querySelector('.form-input').classList.add('error-placeholder')
    }        

    const newColumn = {
      id: 'column-1',
      title: 'to-do',
      taskIds: columnOneTaskIds,
  }

    const newState = {
      ...this.state,
      tasks: tasks,
      columns: {
          ...this.state.columns,
          newColumn,
      }
  }
    this.setState(newState);    
  }

  render () {
    console.log('this.state: ', this.state)
    const arrayToObject = (array) =>
    array.reduce((obj, item) => {
        obj[item.id] = item
        return obj
    }, {})
    const taskList = arrayToObject(this.state.tasks)

    return (
      <React.Fragment>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragUpdate={this.onDragUpdate}
          onDragStart={this.onDragStart}
          >
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {provided => (
                  <Container 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                  >
                      {this.state.columnOrder.map((columnId, index) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => taskList[taskId]);
                      return <Column 
                                key={column.id} 
                                column={column} 
                                tasks={tasks} 
                                index={index}
                                onDeleteTask={this.onDeleteTask}
                                onShowModal={this.onShowModal} 
                                onCloseModal={this.onCloseModal}
                                onEditModal={this.onEditModal}
                                saveModalDetails={this.saveModalDetails}
                          /> 
                      })}
                      {provided.placeholder}
                  <Form onSubmit={this.onAddTask}></Form>
                  <Modal
                        onDeleteTask={this.onDeleteTask}
                        onCloseModal={this.onCloseModal}
                        index={this.index}
                        tasks={this.state.tasks}
                        saveModalDetails={this.saveModalDetails}
                  ></Modal>
                  </Container>
              )
              }
          </Droppable>
        </DragDropContext>
        <Footer></Footer>
        </React.Fragment>
    )
      
  }
};

export default GridView;
