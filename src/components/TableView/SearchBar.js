import React from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import '../../styles/TableView/search.css'

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            searchInput: ''
        };
      }

    searchTasksByTitle = this.props.onSubmit;


    render() {
        return (
            <MuiThemeProvider className="search-input-container">
            <SearchBar
                className="search-input"
                hintText="Search by title..."
                value={this.state.searchInput}
                onChange={(newValue) => this.setState({ searchInput: newValue })}
                onRequestSearch={() => this.searchTasksByTitle(this.state.searchInput)}
                ></SearchBar>
             </MuiThemeProvider>
        )
    }
    
}

export default Search;