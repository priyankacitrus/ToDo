import React, { useEffect, useState } from "react";
import {
  FormControl,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Success from "./Success";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Todo from "./Todo";
import db from "../util/firebase";


const AddTodo = () => {

  //db reference
  const todoRef = db.ref("Todo");
  var newArr = [{}];
  var newObj = { title: null, status: null, timeTaken: null, createdAt: null, done: null };
  const [text, setText] = useState("");
  var [openalert, setOpenalert] = useState(false);
  var [completed,setCompleted]=useState("");
  var [dbtodo,setDbtodo]= useState([]);

  useEffect(() => {
    todoRef.on("value",(snapshot) => {
      const td = snapshot.val();
      dbtodo=[];
      for(let id in td){
        dbtodo.push({id,...td[id]})
      }
      setDbtodo(dbtodo);
       console.log(dbtodo);
    });
  },[]

  );

  //Date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); 
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  let date = new Date(today);
  let day = date.toLocaleString("en-us", { weekday: "long" });

  //create a new todo
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const createTodo = (e) => {

    e.preventDefault();
    //new object creation
    newObj.title = text;
    newObj.status = "new";
    newObj.timeTaken = "00:00:00";
    newObj.createdAt = today;
    newObj.done = false;

    if (text !== "") {
      setText("");
      todoRef.push(newObj);
      setOpenalert(false);
    } else {
      setOpenalert(true);
    }
  };

  //delete a todo
  const setRemove = (item) => {
    newArr = [...dbtodo].filter((todo) => todo !== item);
    setDbtodo(newArr);
  };

   //complete a todo
   const setComplete = (c) => {
    setCompleted(completed,c);
  };

  return (
    <div>
      <Container
        maxWidth="sm"
        style={{ marginTop: "50px", backgroundColor: "white", padding: "10px" }}
      >
        <form>
          <Typography variant="h4" component="h2" style={{ padding: "10px", color: "blue", fontFamily: "sans-serif" }}>
            {day}
          </Typography>
          <Typography variant="h5" component="h2" style={{ padding: "10px", color: "blue", fontFamily: "sans-serif" }}>
            {today}
          </Typography>
          <FormControl
            fullWidth={true}
            style={{
              display: "inline",
              alignItems: "right",
              justifyContent: "right",
              marginTop: "20px",
            }}
          >
            <TextField
              style={{ width: "90%", padding: "5px" }}
              id="outlined-basic"
              label="Enter the Task"
              variant="outlined"
              onChange={handleChange}
              required={true}
              value={text}
            />

            <IconButton
              edge="end"
              aria-label="add"
              color="primary"
              size="extra-large"
              onClick={createTodo}
              style={{ marginTop: "10px" }}
            >
              <AddCircleIcon />
            </IconButton>
          </FormControl>
        </form>
      </Container>
      {dbtodo.length >0  ? (

        <List
          sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {
            dbtodo.filter((todo, index) => !todo.done)
              .map((todo, index) =>
              (
                <Todo
                  todoNo={index}
                  todo={todo}
                  key={index}
                  setRemove={setRemove}
                  setComplete={setComplete}
                />
              )
              )}

          {
            dbtodo.filter((todo, index) => todo.done)
              .map((todo, index) =>
              (
                <Todo
                  todoNo={index}
                  todo={todo}
                  key={index}
                  setRemove={setRemove}
                  setComplete={setComplete}
                />

              )
              )
          }


        </List>
      )

        :

        (
          <Container
            maxWidth="sm"
            style={{ backgroundColor: "white", padding: "10px" }}
          >
            <Typography
              style={{
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              No Tasks Added Yet!!!!!
            </Typography>
          </Container>
        )

      }

      {openalert ? (
        <Success message="Please enter a Task!!!!" status="error" />
      ) : (
        ""
      )}
    </div>
  );
};

export default AddTodo;
