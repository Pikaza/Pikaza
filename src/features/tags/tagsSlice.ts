import { RootState } from 'src/app/store';
import { createSlice } from '@reduxjs/toolkit';

export type TagsState = string[];

const initialState: TagsState = [];

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    tagAdded(state, action) {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
  },
});

export const selectAllTags = (state: RootState) => state.tags;
export const { tagAdded } = tagsSlice.actions;
export default tagsSlice.reducer;
