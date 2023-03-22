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

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectAllQuestions);

  useEffect(() => {
    questions.forEach(question => {
      question.tags.forEach(tag => {
        dispatch(tagAdded(tag));
      });
    });
  }, [questions]);

  return (
    <>
      <ButtonAppBar />
      {/* <AddQuestionForm /> */}
      <Container>
        <h1>HELLO, RANDO USER</h1>
        <QuestionsTable />
      </Container>
    </>
  );
};

export default HomeContainer;
