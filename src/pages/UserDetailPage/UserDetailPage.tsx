import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserById, clearError } from '../../store/slices/userSlice';
import { Button, Card, CardContent, Typography, Avatar, CircularProgress } from '@mui/material';


const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
      navigate('/');
    }
  }, [error, dispatch, navigate]);

  if (loading) return <CircularProgress />;
  return (
    <div >
      <Button variant="contained" onClick={() => navigate('/')} >
        Back to List
      </Button>

      {currentUser && (
        <Card>
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.name}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {currentUser.name}
            </Typography>
            <Typography color="text.secondary">City: {currentUser.city}</Typography>
            <Typography color="text.secondary">
              Created: {new Date(currentUser.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDetailPage;