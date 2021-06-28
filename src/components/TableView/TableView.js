import React from 'react';

import '../../styles/TableView/tableView.css'
import Filters from './Filters'
import Table from './Table'
import Footer from '../shared/Footer'

class TableView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        status: '',
        type: '',
        searchInput: ''
    };
  }

  resetTable() {
    this.filteredTasks = this.props.allTasks;
    this.setState( {
        status: 'all',
        type: 'all',
        searchInput: ''
    })
    document.querySelector('.filter-by-type').selectedIndex = null;
    document.querySelector('.search-input').value = '';
  }

  searchTasksByTitle(searchInput) {
    this.setState({searchInput})
  }

  onTypeChange(type) {
    this.setState({type})
  }

  getFilteredTasks() {
    let tasks = Object.keys(this.props.allTasks).map(key => {
      return this.props.allTasks[key];
    })

    let {status, type, searchInput } = this.state;

    if (!!searchInput) {
      if (searchInput !== '') {
        tasks = tasks.filter(task => task.title.toLowerCase().includes(searchInput.trim('').toLowerCase()));
          return tasks 
      } else {
        tasks = Object.keys(this.props.allTasks).map(key => {
          return this.props.allTasks[key];
        })
      }
    }

    if (!!status) {
      if (status !== 'all') {
        tasks = tasks.filter(task => task.status === status)
        return tasks
      } else {
        tasks = Object.keys(this.props.allTasks).map(key => {
          return this.props.allTasks[key];
        })
      }
    }

    if (!!type) {
      if (type !== 'all') {
        tasks = tasks.filter(task => task.type === type)
        return tasks
      } else {
        tasks = Object.keys(this.props.allTasks).map(key => {
          return this.props.allTasks[key];
        })
      }
    }
      return tasks
  }

  render() {
    let filteredItems = this.getFilteredTasks();
    return (
      <section className="table-container">
        <Filters
          resetTable={this.resetTable.bind(this)}
          searchTasksByTitle={this.searchTasksByTitle.bind(this)}
          onTypeChange={this.onTypeChange.bind(this)}
        ></Filters>
        <Table allTasks={filteredItems} searchInput={this.state.searchInput}></Table>
        <Footer></Footer>
      </section>
    )
  }
    
};

export default TableView;
