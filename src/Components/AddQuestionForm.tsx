import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Autocomplete,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { selectAllQuestions } from '../features/questions/questionsSlice';
import { selectAllTags } from '../features/tags/tagsSlice';
import { QuestionsAttributes } from 'server/db';
import {
  questionAdded,
  postQuestions,
} from '../features/questions/questionsSlice';
import { tagAdded } from '../features/tags/tagsSlice';
import { selectUserName } from '../features/users/usersSlice';

export default function AddQuestionForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectAllQuestions);
  const tags = useAppSelector(selectAllTags);
  const username = useAppSelector(selectUserName);
  // export interface QuestionsAttributes {
  //     _id: number;
  // _most_recent:any
  //     question_body: string;
  //     frequency: number;
  //     company: string[];
  //     role: string[];
  //     tags: string[];
  //   }

  const defaultProps = {
    options: questions,
    getOptionLabel: (option: any) => option.question_body,
  };

  const defaultPropsForTags = {
    options: tags,
    getOptionLabel: (option: string[]) => option,
  };

  //value of question input
  const [value, setValue] = useState<string | null>(null);
  const [company, setCompany] = useState<string[]>([]);
  const [role, setRole] = useState<string[]>();
  const [frequency, setFrequency] = useState(1);
  const [enableNewQuestion, setEnableNewQuestion] = useState(false);
  const [enableNewTag, setEnableNewTag] = useState(false);
  const [questionTags, setQuestionTags] = useState<string | null | undefined>(
    null
  );
  const [date, setDate] = useState<any>('');

  const onCompanyChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCompany([e.target.value]);
  const onRoleChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setRole([e.target.value]);
  const onDateChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);
  const onQuestionChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  // const onTagsChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //   setQuestionTags([e.target.value]);

  const onSaveQuestionClicked = async () => {
    //add more requirements
    if (company && role && value && questionTags) {
      console.log(company, role, value, questionTags);
      const newQuestion = {
        _id: 1,
        most_recent: date,
        company: company,
        role: role,
        question_body: value,
        tags: [questionTags], //* This was a hack to get TS to shut up on line 86
        frequency: frequency,
      };
      await Promise.all([
        dispatch(questionAdded(newQuestion)),
        postQuestions(newQuestion),
      ]);
    }
  };
  //textbox style
  const textStyle = { width: '400px', margin: '10px' };

  return (
    <div className="add-question-form">
      <AppBar>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <h3>Add Question</h3>
          <Button
            color="inherit"
            component={Link}
            to={`/home/${username}`}
            variant="outlined"
          >
            HOME
          </Button>
        </Toolbar>
      </AppBar>
      <h4>Add your interview questions here:</h4>
      <form>
        <Stack
          direction={{ xs: 'column', sm: 'column' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <div>
            <TextField
              id="post-date"
              label="Date of Interview"
              type="date"
              defaultValue={date}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onDateChanged}
            />
          </div>
          <TextField
            style={textStyle}
            type="text"
            label="Company"
            variant="outlined"
            onChange={onCompanyChanged}
          />
          <br />
          <TextField
            style={textStyle}
            type="text"
            label="What's your role?"
            variant="outlined"
            onChange={onRoleChanged}
          />
          <br />
          <Autocomplete
            {...defaultProps}
            id="question"
            value={value}
            options={questions.map(question => question.question_body)}
            getOptionLabel={option => option}
            onChange={(e, stuff) => setValue(stuff)}
            renderInput={params => (
              <TextField
                {...params}
                label="Pick a Question..."
                variant="standard"
              />
            )}
          />
          <br />
          <Button
            onClick={() => {
              setEnableNewQuestion(!enableNewQuestion);
              setValue(null);
            }}
          >
            New Question
          </Button>
          <br />
          {enableNewQuestion ? (
            <TextField
              style={textStyle}
              type="text"
              label="New Question"
              variant="outlined"
              disabled={!enableNewQuestion}
            />
          ) : (
            ''
          )}
          <br />
          <Autocomplete
            {...defaultPropsForTags}
            multiple
            id="tags-standard"
            options={tags} //need tags arr
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Multiple values"
                placeholder="Recursion"
              />
            )}
          />
          <br />

          <Button
            onClick={() => {
              setEnableNewTag(!enableNewTag);
            }}
          >
            New Tag
          </Button>
          <br />
          {enableNewTag ? (
            <TextField
              style={textStyle}
              type="text"
              label="New Tag"
              variant="outlined"
            />
          ) : (
            ''
          )}
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={onSaveQuestionClicked}
          >
            Save!
          </Button>
        </Stack>
      </form>
    </div>
  );
}
