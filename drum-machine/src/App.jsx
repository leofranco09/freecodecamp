import { useState } from 'react'
import './App.css'
import Keyboard from './components/Keyboard'
import DumControle from './components/DumControle';
import { firstSoundGroup, secondSoundsGroup } from './components/soundGroup';

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};
const soundsGroup = {
  heaterKit: firstSoundGroup,
  smoothPianoKit: secondSoundsGroup
}

function App() {
  const [soundType, setSoundType] = useState("heaterKit");
  const [sounds, setSounds] = useState(soundsGroup[soundType]);
  const [soundName, setSoundName] = useState("");
  const [volume, setVolume] = useState(1);
  const [power, setPower] = useState(true);

  const stop = () => {
    setPower(!power)
  }
  const handleVolumeChange = (e) => {
    setVolume(e.target.value)
  }
  const play = (key, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play()
  };
  const changeSoundsGroup = () => {
    setSoundName("")
    if(soundType === "heaterKit") {
      setSoundType("smoothPianoKit")
      setSounds(soundsGroup.smoothPianoKit)
    }else {
      setSoundType("heaterKit")
      setSounds(soundsGroup.heaterKit)
    }
  }
  const setKeyVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.key));
    audios.forEach(audio => {
      if(audio) {
        audio.volume = volume
      }
    });
  }

  return (
    <div id='drum-machine'>
      {setKeyVolume()}
      <div className="wrapper">
        <Keyboard play={play} sounds={sounds} power={power} />
        <DumControle 
          changeSoundsGroup={changeSoundsGroup} 
          name={soundName || soundsName[soundType]}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          power={power}
          stop={stop}
        />
      </div>
    </div>
  )
}

export default App
