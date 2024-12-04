import { FaPause, FaPlay, FaUndo } from "react-icons/fa";
import { formatTime } from "./helper";

const Display = ({ displayState, reset, startStop}) => {
  const { timeType, timerRunning, time } = displayState;
  return ( 
    <div className="display">
      <h4 id="timer-label">{timeType}</h4>
      <span
        id="time-left" 
        style={{color: `${timerRunning ? "red" : "white"}`}}>
        {formatTime(time)}
      </span>
      <div>
        <button id="start_stop" onClick={() => startStop(displayState)}>
          {timerRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button id="reset" onClick={reset}>
          <FaUndo />
        </button>
      </div>
    </div>
   );
}
 
export default Display;