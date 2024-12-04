import { useState, useEffect } from 'react'
import './App.css'
import AlarmaSound from "./assets/AlarmaSound.mp3"
import { formatTime } from './helper';
import TimeSetter from './TimeSetter';
import Display from './Display';


const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState({time: sessionTime, timeType: "Session", timerRunning: false});

  useEffect(() => {
    let timerId;
    if(!displayState.timerRunning) return;

    if(displayState.timerRunning) {
      timerId = setInterval(decrementDisplay, 1000)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [displayState.timerRunning]);

  useEffect(() => {
    if(displayState.time === 0) {
      const audio = document.getElementById("beep");
      if(audio) {

        if(!audio.pause){
          audio.pause();
        }
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Error al reproducir: " + err))
      }

      setTimeout(()=> {
        setDisplayState(prev => ({
          ...prev,
          timeType: prev.timeType === "Session" ? "Break" : "Session",
          time: prev.timeType === "Session" ? breakTime : sessionTime
        }))
      }, 1000)
    }
  }, [displayState.time, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(defaultBreakTime)
    setSessionTime(defaultSessionTime)
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false
    })
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }
  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning
    }))
  }
  const changeBreakTime = (time) => {
    if(displayState.timerRunning) return;
    setBreakTime(time)

    if(displayState.timeType === "Break") {
      setDisplayState((prev) => ({
        ...prev,
        time,
      }))
    }
  }

  const changeSessionTime = (time) => {
    if(displayState.timerRunning) return;
    setSessionTime(time)

    setDisplayState((prev) => ({
      ...prev,
      time,
    }))
 }
 const decrementDisplay = () => {
  setDisplayState((prev) => ({
    ...prev,
    time: Math.max(prev.time - 1, 0)
  }))
 }

  return (
    <div className='clock'>
      <h1>25 + 5 Clock</h1>
      <section className="setters">
        <div className='container-controls'>
          <div className="break">
            <h4 id="break-label">Break Length</h4>
            <TimeSetter
              time={breakTime}
              setTime={changeBreakTime}
              min={min}
              max={max}
              interval={interval}
              type="break"
              />
          </div>
          <div className="session">
            <h4 id="session-label">Session Length</h4>
            <TimeSetter
              time={sessionTime}
              setTime={changeSessionTime}
              min={min}
              max={max}
              interval={interval}
              type="session"
              />
          </div>
        </div>
        <Display
          displayState={displayState}
          reset={reset}
          startStop={startStop}
        /> 
        <audio id="beep"src={AlarmaSound}></audio>
      </section>

    </div>
  )
}

export default App
