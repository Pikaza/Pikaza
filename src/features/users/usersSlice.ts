import { RootState } from 'src/app/store';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  username: string;
}

const initialState: UserState = {
  username: 'Stranger',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      if (state.username === initialState.username) {
        state.username = action.payload;
      }
    },
  },
});

export const selectUserName = (state: RootState) => state.users.username;
export const { userLoggedIn } = usersSlice.actions;
export default usersSlice.reducer;
