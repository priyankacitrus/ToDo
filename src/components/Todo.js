import React, { useRef, useState } from "react";
import List from '@mui/material/List';
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


const Todo = ({ todoNo, todo, setRemove }) => {
  var [check, setCheck] = useState(false);
  var [active, setActive] = useState(false);
  var [pause, setPause] = useState(false);
  var [time, setTime] = useState(0);
  var [view, setView] = useState(true);
  var [stopped, setStopped] = useState(false);
  var [stopTime, setStopTime] = useState(0);
  var [openalert, setOpenalert] = useState(false);
  const interval = useRef(null);

  //checkbox checking
  const change = () => {
    check = !check;
    setCheck(check);
    if (check === true) {
      setOpenalert(true);
    }
  }

  //pause button action
  const paused = () => {
    setPause(pause = true);
    setActive(active = false);
    timer("pause");
  }

  //stop button action
  const stop = () => {
    setPause(pause = false);
    setActive(active = false);
    setStopped(stopped = true);
    timer("stop");
    setTime(time);
    secondsToHms();
    setCheck(check = true);
    if (check === true) {
      setOpenalert(true);
    }
  }

  //time convert function
  function secondsToHms() {
     setStopTime (moment.utc(time*1000).format('HH:mm:ss'));
  }

  //play button action
  const play = () => {
    setView(false);
    setPause(pause = false);
    setActive(active = true);
    timer("play");
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
    setRemove(todo);
  }

  return (
    <div>

      <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }} style={{ marginLeft: "auto", marginRight: "auto" }}>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              style={{ color: "green" }}
              edge="start"
              disableRipple
              checked={check}
              onClick={change}
            />

          </ListItemIcon>
          <ListItemText primary={todo} style={{ textDecoration: check ? "line-through" : "none", color: check ? "red" : "black" }} />
          <ListItemText secondary={stopTime} style={{ color: "blue", visibility: stopped ? "visible" : "hidden" }} />

          <ListItemIcon >
            <IconButton edge="end" aria-label="stop" style={{ color: "red", visibility: check || view ? "hidden" : "visible" }} onClick={stop}>
              <StopCircleIcon />
            </IconButton>
          </ListItemIcon>

          <ListItemIcon >
          {active ?
            
              <IconButton edge="end" aria-label="pause" style={{ color: "blue", visibility: check || view || pause ? "hidden" : "visible" }} onClick={paused}>
                <PauseCircleOutlineIcon />
              </IconButton>
           
            :
            
              <IconButton edge="end" aria-label="play" style={{ color: "blue", visibility: check ? "hidden" : "visible" }} onClick={play}>
                <PlayCircleFilledIcon />
              </IconButton>
           
          }
          </ListItemIcon>

          <ListItemIcon onClick={removetodo}>
            <IconButton edge="end" aria-label="delete" style={{ color: "black" }}>
              <Delete />
            </IconButton>
          </ListItemIcon>


          <ListItemIcon style={{ visibility: stopped || check ? "hidden" : "visible" }}>
          {moment.utc(time*1000).format('HH:mm:ss')}
          </ListItemIcon>

        </ListItem>

      </List>
      {
        openalert ? <Success message="Congrats!!!Task Completed." status="success" /> : ""
      }

    </div>
  );
};

export default Todo;