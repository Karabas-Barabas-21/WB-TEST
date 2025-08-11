import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IUser } from '../../types/userTypes';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<IUser>;
  currentUser?: IUser | null;
}

const UserForm: React.FC<UserFormProps> = ({ open, onClose, onSubmit, currentUser }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();

  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
    } else {
      reset({
        name: '',
        avatar: '',
        city: '',
      });
    }
  }, [currentUser, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{currentUser ? 'Edit User' : 'Create User'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent >
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Avatar URL"
            fullWidth
            margin="normal"
            {...register('avatar', { required: 'Avatar URL is required' })}
            error={!!errors.avatar}
            helperText={errors.avatar?.message}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            {...register('city', { required: 'City is required' })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            {currentUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;