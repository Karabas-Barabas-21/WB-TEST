import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, UsersState } from '../../types/userTypes';
import {
  fetchUsers as fetchUsersApi,
  fetchUserById as fetchUserByIdApi,
  createUser as createUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from '../../api/userApi';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const { data, total } = await fetchUsersApi(page, limit);
      return { users: data, totalCount: total };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      const user = await fetchUserByIdApi(id);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: Omit<IUser, 'id'>, { rejectWithValue }) => {
    try {
      const newUser = await createUserApi(user);
      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async (user: IUser, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUserApi(user);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteUserApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentUser, clearError } = usersSlice.actions;
export default usersSlice.reducer;