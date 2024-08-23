import { useEffect } from "react";

const KeyboardKey = ({ play , sound: {url, key, keyCode, id}}) => {
  const handleKeyDown = (e) => {
    if(e.keyCode === keyCode) {
      play(key, id)
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
  }, []);
  return ( 
    <button id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
        <audio id={key} className="clip" src={url}>{key}</audio>
        {key}
      </button>
   );
}
 
export default KeyboardKey;