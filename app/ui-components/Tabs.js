import React from 'react';
import { makeStyles, styled } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';

const GDTabs = styled(Tabs)({ });

export default function StyledComponents(props) {
  return <GDTabs {...props} />;
}