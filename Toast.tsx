import * as React from 'react';
import { render } from 'react-dom';
import { Alert, Snackbar } from '@mui/material';

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
        <Alert severity={variant} onClose={this.handleClose as any} sx={{ width: '100%' }}>{message}</Alert>
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
