import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../../services/authService';
import { post } from '../../services/fetch';

// First, create the thunk
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData, thunkAPI) => post({
    endpoint: loginApi,
    body: userData,
    auth: false,
    multipart: false,
    param: ''
  })
);

// Then, handle actions in your reducers:
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: null, status: 'idle', error: null, loggedIn: false
  },
  reducers: {
    success: (state, { payload }) => ({
      status: 'idle',
      error: null,
      data: payload
    }),
    failed: (state, { payload }) => ({
      ...state,
      status: 'idle',
      error: payload,
      data: null
    }),
    loading: (state) => ({
      status: 'busy',
      error: null,
      data: null
    })
  },

  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [loginUser.pending]: (state) => ({
      status: 'busy',
      error: null,
      data: null
    }),
    [loginUser.fulfilled]: (state, action) => {
      console.log('action:', action);
      return ({
        status: 'idle',
        error: null,
        data: action.data,
        loggedIn: true
      });
    },
    [loginUser.rejected]: (state, action) => {
      console.log('action:', action);
      return ({
        status: 'idle',
        error: action.data,
        data: null
      });
    }
  }
});

const { actions, reducer } = loginSlice; /* variable hoisting principle */
export const {
  loading,
  success,
  failed
} = actions; /* exposed for direct dispatch from component */
export const loginSelector = (state) => state.login; /* access to login state */
export default reducer;
