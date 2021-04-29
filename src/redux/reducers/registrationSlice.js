import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerIndividualApi } from '../../services/authService';
import { post } from '../../services/fetch';

// First, create the thunk
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, thunkAPI) => (
    // eslint-disable-next-line no-return-await
    await post({
      endpoint: registerIndividualApi,
      body: userData,
      auth: false,
      multipart: false,
      param: ''
    }).then((r) => (r))
  )
);

// Then, handle actions in your reducers:
const registrationSlice = createSlice({
  name: 'register',
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
    [registerUser.pending]: (state) => ({
      status: 'busy',
      error: null,
      data: null
    }),
    [registerUser.fulfilled]: (state, action) => {
      console.log('action', action);
      return ({
        status: 'idle',
        error: null,
        data: action.payload,
        loggedIn: true
      });
    },
    [registerUser.rejected]: (state, action) => {
      console.log(action);
      return ({
        status: 'idle',
        error: action.payload,
        data: null
      });
    }
  }
});

const { actions, reducer } = registrationSlice; /* variable hoisting principle */
export const {
  loading,
  success,
  failed
} = actions; /* exposed for direct dispatch from component */
export const registerSelector = (state) => state.login; /* access to login state */
export default reducer;
