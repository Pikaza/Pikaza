import { useEffect, useState } from "react";
import { Root } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { fetchQuestions } from "../features/questions/questionsSlice";

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  const questions = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    const questionsFetched = dispatch(fetchQuestions());

    console.log("questions fetched", questions);
  }, [dispatch]);

  return (
    <div>
      <h1>HELLO</h1>
    </div>
  );
};

export default HomeContainer;
