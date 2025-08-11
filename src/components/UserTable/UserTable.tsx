import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsers, setCurrentUser, removeUser, addUser, editUser } from '../../store/slices/userSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  CircularProgress,
  Avatar,
} from '@mui/material';

import { useEffect } from 'react';
import { IUser } from '../../types/userTypes';
import UserForm from '../UserForm/UserForm';


const UserTable: React.FC = () => {
   const dispatch = useAppDispatch();
  const { users, loading, error, currentUser  } = useAppSelector((state) => state.users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (user: IUser) => {
    dispatch(setCurrentUser(user));
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(removeUser(id));
    }
  };

  const handleRowClick = (id: string) => {
    navigate(`/user/${id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setCurrentUser(null));
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
       <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        
      >
        Add User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover onClick={() => handleRowClick(user.id)}>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.name} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(user);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user.id!);
                    }}
                  >Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
 <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={100} // Replace with actual total count from API
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <UserForm
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(user) => {
          if (user.id) {
            dispatch(editUser(user));
          } else {
            dispatch(addUser(user));
          }
          handleCloseModal();
        }}
        currentUser={currentUser}
      />
    </div>
  );
};

export default UserTable;