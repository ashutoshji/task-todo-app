import React from 'react';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import GridView from '../GridView/GridView';
import TableView from '../TableView/TableView';

function TabPanel(props) {
  const { children, value, index, ...other  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  tabs: {
    backgroundColor: '#ebecf0',
    color: `#0279bf`,
    boxShadow: `0px 1px 15px rgba(0, 0, 0, .2)`,
    fontWeight: 900
  },
  grid: {
    backgroundColor: '#0279bf',
    height: 'min-content',
    paddingBottom: '50vh',
    marginTop: '4vh'
  },
  table: {
    backgroundColor: 'whitesmoke',
    height: 'min-content',
    paddingBottom: '20vh',
    marginTop: '2vh'  
  }
}));

const FullWidthTabs = props => {
  const classes = useStyles();
  let theme = useTheme();
  theme = theme.direction
  const [value, setValue] = React.useState(0);

  const {tasks} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" color="default" className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="#0279bf!important"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Grid View" {...a11yProps(0)} />
          <Tab label="Table View" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}  className={classes.grid}>
            <GridView tasks={tasks} state={props.state} onSubmit={props.onSubmit}></GridView>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} className={classes.table}>
            <TableView allTasks={tasks} state={props.state}></TableView>
        </TabPanel>
      </SwipeableViews>
      </React.Fragment>
  );
}

export default FullWidthTabs