import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { fetchQuestions } from './features/questions/questionsSlice';
import HomeContainer from './Container/HomeContainer';
import AddQuestionForm from './Components/AddQuestionForm';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth from './Components/Auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fdd835',
    },
    secondary: {
      main: '#009688',
    },
  },
});
function App() {
  // initial fetch of the list of questions from the db via the backend
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/home" element={<HomeContainer />} /> */}
        <Route path="/addQuestion" element={<AddQuestionForm />} />
        <Route path="/home/:username" element={<HomeContainer />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
