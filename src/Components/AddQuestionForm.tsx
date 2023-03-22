import { Typography, AppBar, Toolbar, TextField, Button, Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { selectAllQuestions } from "../features/questions/questionsSlice";

const textStyle = { width: "400px", margin: "10px" };

export default function AddQuestionForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectAllQuestions);
  // export interface QuestionsAttributes {
  //     _id: number;
  //     question_body: string;
  //     frequency: number;
  //     company: string[];
  //     role: string[];
  //     tags: string[];
  //   }
  // const defaultProps = {
  //   options: top100Films,
  //   // getOptionLabel: (option: FilmOptionType) => option.title,
  // };

  //on change on the form, it will update the state on this element, then with submit button will send to back
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("Pick a role:"); //role
  //questions input is like a textbox, so an array of strings
  const [question, setQuestion] = useState("");
  //make users provide a title of question?
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");

  const onCompanyChanged = (e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value);
  const onRoleChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value);
  const onNotesChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value); //do we even have notes
  const onQuestionChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value);

  //we need just the questionbank here...
  return (
    <div className="add-question-form">
      <AppBar>
        <Toolbar>
          <h3>Add Question</h3>
          <Button color="inherit" component={Link} to="/home" variant="outlined">
            HOME
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h5">Add your questions</Typography>
      <form>
        <TextField style={textStyle} type="text" label="Company" variant="outlined" />
        <br />
        <TextField style={textStyle} type="text" label="goal description" variant="outlined" />
        <br />
        {/* <Autocomplete
          {...defaultProps}
          id="controlled-demo"
          value={value}
          onChange={(event: any, newValue: FilmOptionType | null) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="controlled" variant="standard" />}
        /> */}
        <br />
        <TextField style={textStyle} type="text" label="Attribute" variant="outlined" />
        <br />
        <TextField style={textStyle} type="text" label="goal stage" variant="outlined" />
        <br />
        <Button variant="contained" color="primary">
          save
        </Button>
      </form>
    </div>
  );
}

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useAppDispatch } from "../../hooks";
// import { nanoid } from "@reduxjs/toolkit";
// import { postAdded } from "./postsSlice";
// // import { selectAllUsers } from "../users/usersSlice";
// // import { selectAllPosts } from "./postsSlice";

// const AddInterviewPost = () => {
//   const [company, setCompany] = useState("");
//   const [role, setRole] = useState("Pick a role:"); //role
//   //questions input is like a textbox, so an array of strings
//   const [question, setQuestion] = useState("");
//   //make users provide a title of question?
//   const [tags, setTags] = useState([]);
//   const [notes, setNotes] = useState("");

//   const questionsArray = [];

//   //set dispatch to the appDispatch hook
//   const dispatch = useAppDispatch();

//   const onCompanyChanged = (e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value);
//   const onRoleChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value);
//   const onNotesChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value);
//   const onQuestionChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value);

//   const onSavePostClicked = () => {
//     //add more requirements
//     if (company && role && question && tags) {
//       dispatch(
//         postAdded({
//           id: nanoid(),
//           company,
//           role,
//           question,
//           tags,
//         })
//       );
//     }
//   };
//   return (
//     <section>
//       <h2>Add an Interview Question</h2>
//       <form>
//         <label htmlFor="postCompany">Post Title:</label>
//         <input type="text" id="postCompany" name="postCompany" value={company} onChange={onCompanyChanged} />
//         <label htmlFor="postJobTitle">JobTitle:</label>
//         <select id="postJobTitle" value={role} onChange={onRoleChanged}>
//           <option value="Software Engineer">Your good 'ol Software Engineer</option>
//           <option value="Junior">Junior Mints</option>
//           <option value="Mid">Somewhere in the Middle</option>
//           <option value="Senior">Senior Citizen</option>
//           {role}
//         </select>
//         <label htmlFor="postQuestion">Any additional notes:</label>
//         <textarea id="postQuestion" name="postQuestion" value={question} onChange={onQuestionChanged} />
//         <label htmlFor="postNotes">Any additional notes:</label>
//         <textarea id="postNotes" name="postNotes" value={notes} onChange={onNotesChanged} />
//         {/* <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
//           Save Interview Info
//         </button> */}
//       </form>
//     </section>
//   );
// };
// export default AddInterviewPost;
