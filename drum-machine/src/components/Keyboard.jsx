import KeyboardKey from "./KeyboardKey.jsx";

const Keyboard = ({ play, sounds, power }) => {
  return (
    <div className="keyboard">
      {power 
      ? sounds.map(sound => <KeyboardKey play={play} sound={sound} key={sound.key}/>)
      : sounds.map(sound => <KeyboardKey play={play} sound={{...sound, url: "#"}} key={sound.key}/>)
    }
    </div>
)
}
 
export default Keyboard;