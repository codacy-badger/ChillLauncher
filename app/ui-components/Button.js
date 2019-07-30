import React from 'react';
import { makeStyles, styled, withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorCircularProgress = withStyles({
  root: {
    color: 'white',
  },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
  progress: {
    marginRight: theme.spacing(2),
    position: 'relative',
    top: 2
  },
  button: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
}));

export default function StyledComponents({ children, ...props }) {
  const classes = useStyles();

    return (
      <Button className={classes.button} variant="contained" color="primary" {...props}>
        {props.loading && <ColorCircularProgress className={classes.progress} size={15} />}
        {children}
      </Button>
    );
}