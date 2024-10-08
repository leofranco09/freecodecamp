const DumControle = ({ name, changeSoundsGroup, handleVolumeChange, volume, power, stop }) => {
  return ( 
    <div className="controle">
      <button onClick={stop}>Turn the Power {power ? "OFF" : "ON"}</button>
      <h2>Volume: {Math.round(volume * 100)}%</h2>
      <input
        max="1"
        min="0"
        step="0.01"
        type="range"
        value={volume}
        onChange={handleVolumeChange}
       />
      <h2 id="display">{name}</h2>
      <button onClick={changeSoundsGroup}>Change Sounds Group</button>
    </div>
   );
}
 
export default DumControle;