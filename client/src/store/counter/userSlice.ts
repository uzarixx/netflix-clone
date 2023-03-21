import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService from '../../services/fetchServices/userFetch';


export const fetchAuthAccount = createAsyncThunk(
  'userSlice/account',
  async function() {
    try {
      const { data } = await UserService.getMe();
      return data;
    } catch (e) {
      localStorage.removeItem('token');
    }
  },
);

export const fetchAuthUser = createAsyncThunk(
  'userSlice/user',
  async function() {
    try {
      const token = localStorage.getItem('userToken');
      if (token) {
        const { data } = await UserService.getUser(token);
        return data;
      }
    } catch (e) {
      localStorage.removeItem('userToken');
    }
  },
);


export interface CounterState {
  account: {
    email: string,
    id: number,
    isVerify: boolean,
    twoFactor: boolean,
    users: [
      { accountId: number, avatar: string, id: number, username: string, isPin: boolean }
    ]
  } | null;
  isPendingAccount: boolean;
  isPendingUser: boolean;
  user: {
    id: number,
    accountId: number,
    username: string,
    avatar: string,
    pin: null | number,
    isPin: boolean
  } | null;
}

const initialState: CounterState = {
  account: null,
  isPendingAccount: true,
  isPendingUser: true,
  user: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsPinUser: (state, action) => {
      const { id, isPin } = action.payload;
      const user = state?.account?.users.find((user) => user.id === id);
      if (user) {
        user.isPin = isPin;
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CounterState>) => {
    builder.addCase(fetchAuthAccount.pending, (state) => {
      state.isPendingAccount = true;
    });
    builder.addCase(fetchAuthAccount.fulfilled, (state, action) => {
      state.isPendingAccount = false;
      state.account = action.payload;
    });
    builder.addCase(fetchAuthUser.pending, (state) => {
      state.isPendingUser = true;
    });
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      state.isPendingUser = false;
      state.user = action.payload;
    });
  },
});


export default userSlice.reducer;
export const { setAccount, setUser, setIsPinUser } = userSlice.actions;

