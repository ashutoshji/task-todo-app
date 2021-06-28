import React from 'react';

import axios from 'axios'
import Tabs from './shared/Tabs'
import '../styles/app.css'

import initialData from '../initialData'


class App extends React.Component {
  state = initialData
  tasks = this.state.tasks

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    axios.get(`https://my-json-server.typicode.com/sherif-ffs/IS322-task-tracker/db`)
      .then(response => {
        console.log('response: ', response)
      }).catch (error => {
        this.setState({ errorMessage: error.message });
      });
  }

  render() {

    return (
      <React.Fragment>
        <Tabs tasks={this.state.tasks} state={this.state} ></Tabs>
      </React.Fragment>
    );
  }
}

export default App;