import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import { QuestionsAttributes } from '../../../server/db';

type QuestionsState = QuestionsAttributes[];
// export interface QuestionsAttributes {
//     _id: number;
//     question_body: string;
//     frequency: number;
//     company: string[];
//     role: string[];
//     tags: string[];
//   }
const initialState: QuestionsState = [];

export const fetchQuestions = createAsyncThunk('fetchQuestions', async () => {
  console.log('async thunker');
  const response = await axios.get('http://localhost:8080/');
  console.log('response from fetchQuestions asyncthunk', response.data);
  return response.data;
});

//post - not connected
export const postQuestions = createAsyncThunk(
  'postQuestions',
  async (question: QuestionsAttributes) => {
    console.log('async thunker post');
    try {
      const response = await axios.post('http://localhost:8080/', question);
      console.log('response from fetchQuestions asyncthunk', response.data);
      return response.data;
    } catch (error) {
      console.log('Error posting question in postQuestions THUNK');
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    questionAdded(state, action) {
      console.log('questionadded reducer', action.payload);
      state.push(action.payload);
      //if the _id was not created by db and it is a new question
      //just push into array to send back to db
      // if (!action.payload._id) {
      //   state.push(action.payload);
      // }
      //if _id exists, update freq of that question object
      // state.forEach(stateObj => {
      //   if (action.payload._id === stateObj._id) {
      //     stateObj.frequency++;
      //   }
      // });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(postQuestions.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllQuestions = (state: RootState) => state.questions;
//export the questionAdded actions reducer
export const { questionAdded } = questionsSlice.actions;
export default questionsSlice.reducer;
