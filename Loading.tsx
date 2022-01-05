import React from 'react';
import { CircularProgress, Fade, makeStyles } from '@mui/material';

const useStyles: any = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.01)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export interface Props {
  style?: any,
  loading?: boolean
  children?: React.ReactNode
}

export function Loading({ style = {}, loading, children }: Props) {
  if (!loading) {
    return null;
  }
  const classes = useStyles();
  return (
    <div style={style} className={classes.root}>
      <div className={classes.wrapper}>
        <Fade in={loading}
              style={{ marginBottom: 7, transitionDelay: loading ? '800ms' : '0ms' }}
              unmountOnExit
        >
          <CircularProgress/>
        </Fade>
        {children}
      </div>
    </div>
  );
}
