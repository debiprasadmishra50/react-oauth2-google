import styled from '@emotion/styled';
import { Snackbar, SnackbarOrigin } from '@mui/material';
import Alert, { AlertProps } from '@mui/material/Alert';
import { memo } from 'react';

interface IToastProps {
  open: boolean;
  type: AlertProps['severity'];
  message: string;
  setOpen: Function;
  horizontalAlignment: SnackbarOrigin['horizontal'];
  verticalAlignment: SnackbarOrigin['vertical'];
  autoHideDuration?: number;
}
function Toast(props: IToastProps) {
  const {
    open,
    type,
    message,
    setOpen,
    horizontalAlignment,
    verticalAlignment,
    autoHideDuration,
  } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const Message = styled.p`
    margin: 0;
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 22px;
  `;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: verticalAlignment,
        horizontal: horizontalAlignment,
      }}
      sx={{ zIndex: 10000, maxWidth: { md: '40vw' } }}
      open={open}
      autoHideDuration={autoHideDuration ? autoHideDuration : 3000}
      onClose={handleClose}
    >
      <Alert variant="filled" elevation={6} onClose={handleClose} severity={type}>
        <Message>{message}</Message>
      </Alert>
    </Snackbar>
  );
}

Toast.defaultProps = { horizontalAlignment: 'right', verticalAlignment: 'top' };
export default memo(Toast);
