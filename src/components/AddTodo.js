import React, { useState } from "react";
import { FormControl, Container, Button, TextField, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Success from "./Success";

const AddTodo = ({ makeTodos }) => {
  const [text, setText] = useState("");
  var [openalert, setOpenalert] = useState(false);

  const handleChange = (e) => setText(e.target.value);
  const createTodo = (e) => {
   if(text!==""){
    e.preventDefault();
    setText("");
    makeTodos(text);
   }
   else{
    setOpenalert(true);
   }

  };

  //Date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;


let date = new Date(today);
let day = date.toLocaleString('en-us', {weekday: 'long'});
  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "50px",backgroundColor:"white",padding:"10px" }}>
        <form>
        <Typography variant="h4" component="h2">
           {day}
          </Typography>
          <Typography variant="h5" component="h2">
           {today}
          </Typography>
          <FormControl fullWidth={true} style={{display:"inline",alignItems:"right",justifyContent:"right"}}>
            <TextField
            style={{width:"85%"}}
              label="Enter the Activity"
              variant="standard"
              onChange={handleChange}
              required={true}
              value={text}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 5 ,padding:"30px",borderRadius:"50%",width:"50px",height:"50px"}}
              onClick={createTodo}
            >
              <Add />
            
            </Button>
          </FormControl>
        </form>
      </Container>
      {
        openalert ? <Success message="Please enter an Activity!!!!" status="error" /> : ""
      }
    </div>
  );
};

export default AddTodo;