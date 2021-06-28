import React from 'react';

import Button from '@material-ui/core/Button';
import FilterType from './Select'
import SearchBar from './SearchBar'

import '../../styles/TableView/filters.css'
import '../../styles/TableView/button.css'

class Filters extends React.Component {

  render () {
    const {onTypeChange, resetTable, searchTasksByTitle} = this.props;

    return (
        <section className="filters-container">
          <Button className="button filter" onClick={resetTable} variant="contained" color="primary">Reset Table</Button>
          <SearchBar className="filter" onSubmit={searchTasksByTitle}></SearchBar>
          <FilterType className="filter" onChange={onTypeChange}></FilterType>
        </section>
    )
  }
};

export default Filters;
