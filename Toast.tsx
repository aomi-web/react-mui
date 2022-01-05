import * as React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';
import { IconButton, Snackbar, SnackbarContent, Theme, withStyles } from '@mui/material';
import { amber, green } from '@mui/material/colors';

import { CheckCircle, Warning, Error, Info, Close } from '@mui/icons-material';


const styles = (theme: Theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info
};

export interface Props {
  classes?: any;
  className?: string;
  message?: React.ReactNode;
  onClose: any;
  variant: 'success' | 'warning' | 'error' | 'info';
}

@(withStyles(styles) as any)
export class SnackbarContentWrapper extends React.Component<Props> {

  render() {
    const { classes, variant, className, message, onClose, ...other } = this.props;
    const Icon = variantIcon[variant];

    const messageWrapper = (
      <span id="client-snackbar" className={classes.message}>
        <Icon className={classNames(classes.icon, classes.iconVariant)}/>
        {message}
      </span>
    );
    const action = [
      <IconButton key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={onClose}
      >
        <Close className={classes.icon}/>
      </IconButton>
    ];

    return (
      <SnackbarContent className={classNames(classes[variant], className)}
                       aria-describedby="client-snackbar"
                       message={messageWrapper}
                       action={action}
                       {...other}
      />
    );
  }

}

export class Toast extends React.Component<any> {

  state = {
    open: true
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { variant, message } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={this.state.open}
        autoHideDuration={3500}
        onClose={this.handleClose}
      >
        <SnackbarContentWrapper onClose={this.handleClose}
                                message={message}
                                variant={variant}
        />
      </Snackbar>
    );
  }

}

export function show(variant, msg) {
  let body = document.createElement('div');
  document.body.append(body);
  render(<Toast variant={variant} message={msg} body={body}/>, body);
}

export function success(msg) {
  show('success', msg);
}

export function warn(msg) {
  show('warning', msg);
}

export function error(msg) {
  show('error', msg);
}

export function info(msg) {
  show('info', msg);
}
