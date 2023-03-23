import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Root } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {
  fetchQuestions,
  postQuestions,
  selectAllQuestions,
} from '../features/questions/questionsSlice';
import QuestionsTable from '../Components/QuestionsTable';
// import Row from "@mui/material/Row";
import ButtonAppBar from '../Components/NavBar';
import AddQuestionForm from '../Components/AddQuestionForm';
import { tagAdded } from '../features/tags/tagsSlice';
import { useParams } from 'react-router-dom';
import { userLoggedIn } from '../features/users/usersSlice';

const HomeContainer = () => {
  // grab the username off the Params and set it in the redux store
  const dispatch = useAppDispatch();

  const { username } = useParams();
  useEffect(() => {
    dispatch(userLoggedIn(username));
  }, [username]);

  return (
    <>
      <ButtonAppBar />
      {/* <AddQuestionForm /> */}
      <Container>
        <h1>HELLO, {username}</h1>
        <QuestionsTable />
      </Container>
    </>
  );
};

export default HomeContainer;
