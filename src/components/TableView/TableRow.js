import React from 'react';

import '../../styles/TableView/table.css'

class TableRow extends React.Component{

  render() {
    return (
        <tr key={this.props.key}>
            <td>{this.props.title}</td>
            <td>{this.props.status}</td>
            <td>{this.props.type}</td>
        </tr>
    )
  }
  
};

export default TableRow;