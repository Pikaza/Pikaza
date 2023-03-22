import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FormControl, FormLabel } from "@mui/material";

// const questionExample = {
//     _id: 10,
//     question_body: "I did TwoSum",
//     frequency: 300,
//     company: ["Headbook"],
//     role: ["frontend"],
//     tags: ["fanggg"],
//   };

const QuestionForm = () => {
  return (
    <FormControl>
      <FormLabel>Company</FormLabel>
      <TextField></TextField>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={10}
          defaultValue="Write your question here pleez"
        />
      </div>
      <div>
        <Box
          component="form"
          ref={formRef}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          id="note-form"
        >
          <div>
            <TextField
              id="note-date"
              label="Today's Date"
              type="date"
              defaultValue={date}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                if (e.target.value) {
                  noteDate = document.getElementById("note-date").value;
                  setDate(noteDate);
                }
              }}
            />
          </div>
          <div>
            <TextField
              id="note-title"
              label="Name your note:"
              placeholder="Name your note:"
              multiline
              variant="filled"
              //   onChange={}
            />
          </div>
          <div>
            <TextField
              id="note-body"
              label="What kinda note do you wanna write?"
              placeholder="Try using half-dark-chocolate and half-milk-chocolate next time..."
              multiline
              rows={6}
              columns={10}
              //   onChange={}
            />
          </div>
          <Button variant="contained" id="note-submit-btn" type="submit" onClick={submitNote}>
            Submit Note
          </Button>
        </Box>
      </div>
      <Button>Submit</Button>
    </FormControl>
  );
};

export default QuestionForm;
