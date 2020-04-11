import React ,{useState} from 'react';
import FlashcardList from './componets/FlashcardList';
import './app.css'
function App() {

  const [flashcards,setFlashcards] = useState(SAMPLE_FLASHCARDS)


  return (
    
      <FlashcardList flashcards={flashcards}/>
  );
}

const SAMPLE_FLASHCARDS=[
  {
    id:1,
    question:"What is 2+2",
    answer:"4",
    options:['2','3','4','5']

  },
  {
    id:2,
    question:"What is 3+3",
    answer:"6",
    options:['2','3','4','5']

  },
  {
    id:3,
    question:"What is 4+4",
    answer:"8",
    options:['2','3','4','8']

  },
]
export default App;


