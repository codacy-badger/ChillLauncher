import React from 'react';
import { makeStyles, styled } from '@material-ui/styles';
import Tab from '@material-ui/core/Tab';

const GDTab = styled(Tab)({ });

export default function StyledComponents(props) {
  return <GDTab {...props} />;
}