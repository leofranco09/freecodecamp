import { useState } from 'react'
import QuoteBox from './components/QuoteBox';

const quoteData = [
  {
    text: '"Many of life’s failures are people who did not realize how close they were to success when they gave up."',
    author: "Thomas A. Edison"
  },
  {
    text: '"Never let the fear of striking out keep you from playing the game."',
    author: "Babe Ruth"
  },
  {
    text: '"Don’t settle for what life gives you; make life better and build something."',
    author: "Ashton Kutcher"
  },
  {
    text: `"I believe every human has a finite number of heartbeats. I don't intend to waste any of mine."`,
    author: "Neil Armstrong"
  },
  {
    text: '"The best way to predict your future is to create it."',
    author: "Abraham Lincoln"
  }
]

const getRandomColor = () => { 
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);

  return `rgb(${red}, ${green}, ${blue})`
 }

function App() {
  const getRandomIndex = () => Math.round(Math.random() * ((quoteData.length - 1) - 0) + 0);
  const [quote, setquote] = useState(quoteData[getRandomIndex()]);
  const [randomColor, setRandomColor] = useState(getRandomColor());
  
  const handleNewQoute = () => {
    setquote(quoteData[getRandomIndex()])
    setRandomColor(getRandomColor())
  }

  return (
    <div className='main' style={{backgroundColor: randomColor}} >
      <QuoteBox quote={quote} handleNewQoute={handleNewQoute} randomColor={randomColor} />
    </div>
  )
}

export default App
