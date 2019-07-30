import React from 'react';
import { makeStyles, styled } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';

const GDAppBar = styled(AppBar)({ });

export default function StyledComponents(props) {
  return <GDAppBar {...props} />;
}