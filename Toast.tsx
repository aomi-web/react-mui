import * as React from 'react';
import { render } from 'react-dom';
import { Box, IconButton, Snackbar, SnackbarContent, Stack, Theme } from '@mui/material';
import { amber, green } from '@mui/material/colors';

import { CheckCircle, Warning, Error, Info, Close } from '@mui/icons-material';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info
};

const bgColor = {
  success: green[600],
  error: 'error.dark',
  info: 'primary,dark',
  warning: amber[700]
};

export interface Props {
  classes?: any;
  className?: string;
  message?: React.ReactNode;
  onClose: any;
  variant: 'success' | 'warning' | 'error' | 'info';
}

export class SnackbarContentWrapper extends React.Component<Props, any> {

  render() {
    const { classes, variant, message, onClose, ...other } = this.props;
    const Icon = variantIcon[variant];

    const messageWrapper = (
      <Stack alignItems="center" spacing={1}>
        <Icon fontSize="md" opacity={0.9}/>
        {message}
      </Stack>
    );
    const action = [
      <IconButton key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={onClose}
      >
        <Close fontSize="md"/>
      </IconButton>
    ];

    return (
      <SnackbarContent aria-describedby="client-snackbar"
                       message={messageWrapper}
                       action={action}
                       sx={{
                         backgroundColor: bgColor[variant]
                       }}
                       {...other}
      />
    );
  }

}

export class Toast extends React.Component<any, any> {

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
