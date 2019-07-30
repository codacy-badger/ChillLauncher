import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from 'ui/AppBar';
import Tabs from 'ui/Tabs';
import Tab from 'ui/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { history } from '../../../../../store/configureStore';

function LinkTab(props) {
  return (
    <Tab
      onClick={event => {
        event.preventDefault();
        history.push(props.href);
      }}
      {...props}
    />
  );
}

export default function NavTabs(props) {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }


  return (
    <div>
      <AppBar position="relative">
        <Tabs
          variant="standard"
          value={value}
          onChange={handleChange}
        >
          <LinkTab label="Home" href="/home" />
          <LinkTab label="Instances" href="/dmanager" />
          <LinkTab label="Modpacks" href="/curseModpacksBrowser" />
        </Tabs>
      </AppBar>
    </div>
  );
}
