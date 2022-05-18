import React, { useRef, useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { ListItemIcon, Checkbox } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import Success from "./Success";
import moment from "moment";
import { Fade } from "@mui/material";
import db from "../util/firebase";


const Todo = ({ todo, setRemove, setComplete }) => {
  //timer states
  var [active, setActive] = useState(false);
  var [pause, setPause] = useState(false);
  var [time, setTime] = useState(0);
  var [view, setView] = useState(true);
  const interval = useRef(null);

//alert states
  var [openalert, setOpenalert] = useState(false);
  var [deletealert, setDeletealert] = useState(false);
  
  //checkbox states
  var [check, setCheck] = useState(false);

  //db reference
  const todoRef = db.ref("Todo").child(todo.id);


  //checkbox checking
  const change = () => {
    setCheck(!check);
    if (todo.status === "completed") {
      setOpenalert(openalert = false);
      setComplete(false);
      setTime(moment.duration(todo.timeTaken).asSeconds());
      todoRef.update({
        status: "pending",
        done: "false",
      });
    }
    else {
      setOpenalert(openalert = true);
      setComplete(true);
      todoRef.update({
        status: "completed",
        done: "true",
        timeTaken: moment.utc(time * 1000).format('HH:mm:ss')
      })
      setTime(0);
      ;
    }
  }

  //pause button action
  const paused = () => {
    setPause(pause = true);
    setActive(active = false);
    timer("pause");
    todoRef.update({
      status: "pending",
    });
  }

  //stop button action
  const stop = () => {
    setPause(pause = false);
    setActive(active = false);
    setView(true);
    setCheck(true);
    timer("stop");
    setTime(0);
    secondsToHms();
    setOpenalert(openalert = true);
    setComplete(true);
    todoRef.update({
      status: "completed",
      done: "true",
      timeTaken: moment.utc(time * 1000).format('HH:mm:ss')
    });
  }

  //time convert function
  function secondsToHms() {
    todo.timeTaken = moment.utc(time * 1000).format('HH:mm:ss');
  }

  //play button action
  const play = () => {
    setView(false);
    setPause(pause = false);
    setActive(active = true);
    timer("play");
    setTime(moment.duration(todo.timeTaken).asSeconds());
    todoRef.update({
      status: "pending",
    });
  }

  //Timer start function
  const timer = (status) => {

    if (status === "play") {
      interval.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    else if (status === "pause") {
      clearInterval(interval.current);
    }
    else {
      clearInterval(interval.current);
    }

  }


  //delete icon action
  const removetodo = () => {
    setDeletealert(false);
    const todoRef = db.ref("Todo").child(todo.id);
    todoRef.remove();
    setDeletealert(deletealert=true);
    console.log(deletealert);
    setRemove(todo);

  }

  return (

    <Fade in={true} timeout={200}>
      <div>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              style={{ color: "green" }}
              edge="start"
              disableRipple
              checked={todo.status === "completed" ? true : false}
              onClick={change}
            />

          </ListItemIcon>
          <ListItemText primary={todo.title} style={{ textDecoration: todo.status === "completed" ? "line-through" : "none", color: todo.status === "completed" ? "red" : "black" }} />
          <ListItemText secondary={todo.timeTaken} style={{ color: "blue", visibility: todo.done ? "visible" : "hidden" }} />

          <ListItemIcon >
            <IconButton edge="end" aria-label="stop" style={{ color: "red", visibility: todo.status === "completed" || view ? "hidden" : "visible" }} onClick={stop}>
              <StopCircleIcon />
            </IconButton>
          </ListItemIcon>

          <ListItemIcon >
            {active ?

              <IconButton edge="end" aria-label="pause" style={{ color: "blue", visibility: todo.status === "completed" || view || pause ? "hidden" : "visible" }} onClick={paused}>
                <PauseCircleOutlineIcon />
              </IconButton>

              :

              <IconButton edge="end" aria-label="play" style={{ color: "blue", visibility: todo.status === "completed" ? "hidden" : "visible" }} onClick={play}>
                <PlayCircleFilledIcon />
              </IconButton>

            }
          </ListItemIcon>

          <ListItemIcon style={{ visibility: todo.status === "completed" ? "hidden" : "visible" }}>
            {moment.utc(time * 1000).format('HH:mm:ss')}
          </ListItemIcon>

          <ListItemIcon onClick={removetodo}>
            <IconButton edge="end" aria-label="delete" style={{ color: "black" }}>
              <Delete />
            </IconButton>
          </ListItemIcon>

        </ListItem>
        {
          openalert ? <Success message="Congrats!!!Task Completed." status="success" /> : ""
        }
        {
          deletealert ? <Success message="Task Deleted!!!" status="success" /> : ""
        }
      </div>
    </Fade>
  );
};

export default Todo;