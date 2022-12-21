import { useEffect, useState } from 'react';

import './app.style.css';
import Line from './components/line/line.component';
import englishWords from './assets/wordleEnglishWords.json';

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [solution, setSolution] = useState('');
  const [words, setWords] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [textWinOrLose, setTextWinOrLose] = useState("you've won!!!");
  
    const fetchWord = () =>{
      setIsDialogOpen(false);
      const randomWord = englishWords[Math.floor(Math.random() * englishWords.length)];
      setSolution(randomWord);
      setGuesses(Array(6).fill(null));
      setIsGameOver(false);
    }

  useEffect(()=>{
    fetchWord();
  },[])
  
  useEffect(()=>{
    const handleKeyPress = (e) =>{
      if(isGameOver) return;
      //delete a word
      if(e.key === 'Backspace'){
        setWords(words.slice(0,-1));
        return;
      }
      //submit Word
      if(e.key === 'Enter'){
        if(words.length < 5) return;
        const newGuess = [...guesses];
        newGuess[guesses.findIndex(val => val === null)] = words;
        setGuesses(newGuess);
        const isCorrect = words === solution;
        if(isCorrect) {
          setIsGameOver(true);
          setIsDialogOpen(true);
        };
        setWords('');
      }
      //not more than 5 length
      if(words.length >= 5) return;
      const isLetter = e.key.match(/^[a-z]{1}$/) != null;
      if(isLetter){
        setWords(words + e.key);
      }
    }
    
    window.addEventListener('keydown',handleKeyPress);
    if(!guesses.includes(null) && !isGameOver){
      setIsDialogOpen(true);
      setTextWinOrLose(`You lose :(`);
    }
    return () => window.removeEventListener('keydown', handleKeyPress)
  },[words,guesses, isGameOver,solution,textWinOrLose])

  return (
  <div id='app-container'>
    <div className="board-container">
      {
        guesses.map((guess, idx) =>{
          const isCurrentGuess = idx === guesses.findIndex(val => val === null);
          return(
            <Line 
            guess = {isCurrentGuess ? words : guess ?? ''}
            key={idx}
            solution={solution}
            isFinal={!isCurrentGuess && guess != null}
            />
          )
        })
      }
    </div>
    <dialog open={isDialogOpen ? true : false} className='modal'>
      <h2 className='dialog--h2'>{textWinOrLose}</h2>
      <p className='dialog--p'>Do you want another random word?</p>
      <div className='dialog--button_box'>
        <button onClick={fetchWord}>Yes</button>
        <button onClick={()=>{setIsDialogOpen(false)}}>No</button>
      </div>
    </dialog>
  </div>
  
  )
}

export default App
