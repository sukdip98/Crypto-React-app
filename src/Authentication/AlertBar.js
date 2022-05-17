import { Alert, Snackbar } from '@mui/material';
import React from 'react'
import CryptoContext from '../CryptoContext';
const AlertBar = () => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      };
  return (
<Snackbar open={false} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} elevation={10} variant="filled" severity={alert.type}></Alert>
</Snackbar>
  )
}

export default AlertBar