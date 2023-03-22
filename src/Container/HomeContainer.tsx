import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Root } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { fetchQuestions, postQuestions, selectAllQuestions } from "../features/questions/questionsSlice";
import QuestionsTable from "../Components/QuestionsTable";
// import Row from "@mui/material/Row";
import ButtonAppBar from "../Components/NavBar";
import AddQuestionForm from "../Components/AddQuestionForm";
import { useParams } from 'react-router-dom';

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectAllQuestions);
  const { username } = useParams()

  // export interface QuestionsAttributes {
  //     _id: number;
  //     question_body: string;
  //     frequency: number;
  //     company: string[];
  //     role: string[];
  //     tags: string[];
  //   }

  // initial fetch of the list of questions from the db via the backend
  useEffect(() => {
    const questionsFetched = dispatch(fetchQuestions());
    // console.log("questions fetched", questions);
    // rando();
  }, [dispatch]);

  const rando = async () => {
    const questionExample = {
      _id: 10,
      question_body: "I did TwoSum",
      frequency: 300,
      company: ["Headbook"],
      role: ["frontend"],
      tags: ["fanggg"],
    };

    await dispatch(postQuestions(questionExample));
  };
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
