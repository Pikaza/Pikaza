import * as React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

// Material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { selectAllQuestions } from "../features/questions/questionsSlice";

// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function QuestionsTable() {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectAllQuestions).sort((a, b) => a.frequency - b.frequency);

  console.log("hello from the questions table: ");
  console.dir(questions);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Frequency</TableCell>
            <TableCell align="right">Question</TableCell>
            <TableCell align="right">Companies</TableCell>
            <TableCell align="right">Days Since Interview</TableCell>
            <TableCell align="right">Have You Been Asked</TableCell>
            <TableCell align="right">Type of Job</TableCell>
            <TableCell align="right">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((row) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.frequency}
              </TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right">{"days since"}</TableCell>
              <TableCell align="right">{"have you"}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.tags}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
