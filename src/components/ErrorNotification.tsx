
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearError } from '../store/slices/userSlice';
import { Snackbar, Alert } from '@mui/material';

const ErrorNotification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.users);

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorNotification;