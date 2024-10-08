//types
import { SnackbarOrigin } from '@mui/material';
import { AlertProps } from '@mui/material/Alert';
import React, { Fragment, memo, useState } from 'react';
//component
import Snackbar from '.';
//context
import SnackbarContext from './context';

//interface
interface ISnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider = ({ children }: ISnackbarProviderProps) => {
  const [open, setOpen] = useState(false); // set toast state to open or close
  const [type, setType] = useState<AlertProps['severity']>('success'); // set toast type eg. error or success
  const [message, setMessage] = useState(''); // toast message
  const [horizontalAlignment, setHorizontalAlignment] = useState<
    SnackbarOrigin['horizontal'] | undefined
  >(); // toast horizontal alignment
  const [verticalAlignment, setVerticalAlignment] = useState<
    SnackbarOrigin['vertical'] | undefined
  >(); // toast vertical alignment

  const [autoHideDuration, setAutoHideDuration] = useState<number>();

  // toggle toast states
  const showToast = (
    open: boolean,
    type: AlertProps['severity'],
    message: string,
    horizontalAlignment?: SnackbarOrigin['horizontal'],
    verticalAlignment?: SnackbarOrigin['vertical'],
    autoHideDuration?: number
  ) => {
    setOpen(open);
    setType(type);
    setMessage(message);
    setHorizontalAlignment(horizontalAlignment);
    setVerticalAlignment(verticalAlignment);
    setAutoHideDuration(autoHideDuration);
  };

  return (
    <SnackbarContext.Provider value={{ ToastService: { showToast } }}>
      <Fragment>
        <Snackbar
          open={open}
          type={type}
          message={message}
          setOpen={setOpen}
          horizontalAlignment={horizontalAlignment}
          verticalAlignment={verticalAlignment}
          autoHideDuration={autoHideDuration}
        />
        {children}
      </Fragment>
    </SnackbarContext.Provider>
  );
};

export default memo(SnackbarProvider);
