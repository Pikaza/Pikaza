import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from '../features/questions/questionsSlice';
import tagsReducer from '../features/tags/tagsSlice';
import companiesReducer from '../features/companiesSlice/companiesSlice';
import usersReducer from '../features/users/usersSlice';
// import { postQuestions } from "../features/questions/questionsSlice";
// import postsReducer from "./features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    tags: tagsReducer,
    companies: companiesReducer,
    users: usersReducer,

    // questionSlice: questionReducer,
  },
});

//== From https://redux-toolkit.js.org/tutorials/typescript ==//
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
