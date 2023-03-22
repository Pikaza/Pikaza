import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAllQuestions } from '../features/questions/questionsSlice';
import { selectAllTags } from '../features/tags/tagsSlice';
import { parseISO, formatDistanceToNow } from 'date-fns';

// Material UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// import _ from 'lodash'; //
// replacement for lodash import
const intersection = (arr: any, ...args: any) =>
  arr.filter((item: any) => args.every((arr: any) => arr.includes(item)));

export default function QuestionsTable() {
  const questions = useAppSelector(selectAllQuestions);
  const tags = useAppSelector(selectAllTags);
  const [renderedQuestions, setRenderedQuestions] = useState(questions);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    console.log('loaded questions into rendered questions');
    setRenderedQuestions(questions);
  }, [questions]);

  useEffect(() => {
    // console.log('updating rendered questions');
    setRenderedQuestions(
      questions.filter(
        question =>
          intersection(question.tags, selectedTags).length ===
          selectedTags.length
      )
    );
  }, [selectedTags]);

  // if no tags are selected, return true for all of them.

  console.log('hello from the questions table: ');
  console.dir(questions);

  return (
    <>
      <Autocomplete
        multiple
        disablePortal
        value={selectedTags}
        onChange={(e, newlySelectedTags) => {
          setSelectedTags(newlySelectedTags);
        }}
        id="filter-by-tags"
        options={tags}
        sx={{ width: 300 }}
        renderInput={params => <TextField {...params} label="Tags" />}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="questions table">
          <TableHead>
            <TableRow>
              <TableCell>Frequency</TableCell>
              <TableCell align="right">Question</TableCell>
              <TableCell align="right">Companies</TableCell>
              <TableCell align="right">Last Asked</TableCell>
              <TableCell align="right">Type of Job</TableCell>
              <TableCell align="right">Tags</TableCell>
              <TableCell align="right">I've Been Asked This</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderedQuestions.map(row => {
              const date = parseISO(row.most_recent);
              const lastAsked = formatDistanceToNow(date);
              return (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.frequency}
                  </TableCell>
                  <TableCell align="right">{row.question_body}</TableCell>
                  <TableCell align="right">{row.company}</TableCell>
                  <TableCell align="right">{`${lastAsked} ago`}</TableCell>
                  <TableCell align="right">{row.role.toString()}</TableCell>
                  <TableCell align="right">{row.tags.toString()}</TableCell>
                  <TableCell align="right">{'➕'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
