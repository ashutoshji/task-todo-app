import React from 'react';

import '../../styles/GridView/formButton.css'
import Button from '@material-ui/core/Button';

export default function FormButton() {

  return (
    <div>
      <Button variant="contained" className="form-button">Add Task</Button>
    </div>
  );
}