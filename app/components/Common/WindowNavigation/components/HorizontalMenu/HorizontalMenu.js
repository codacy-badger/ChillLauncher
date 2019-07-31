import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

  React.useEffect(() => {
    switch (props.location) {
      case '/home':
        setValue(0);
        break;
      case '/dmanager':
        setValue(1);
        break;
      case '/curseModpacksBrowser':
        setValue(2);
        break;
      default:
        break;
    }
  }, [props.location])



  return (
    <Tabs
      variant="standard"
      value={value}
      indicatorColor="primary"
    >
      <LinkTab label="Home" href="/home" />
      <LinkTab label="Instances" href="/dmanager" />
      <LinkTab label="Modpacks" href="/curseModpacksBrowser" />
    </Tabs>
  );
}
