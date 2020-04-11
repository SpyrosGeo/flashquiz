import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './componets/FlashcardList';
import './app.css'
import axios from 'axios'
const URL = 'https://opentdb.com/api.php'

function App() {

  const [flashcards, setFlashcards] = useState([])
  const [categories,setCategories] = useState([])

  const categoryEl =useRef()
  const amountEl =useRef()

  useEffect(()=>{
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res =>{
        setCategories(res.data.trivia_categories)
        
    })
  },[])

    useEffect(() => {
     

    }, [])
  //remove the annoying html element chars from the response text
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }


  function handleSubmit(e) {
    e.preventDefault()
    axios.get(URL,{
      params:{
        amount:amountEl.current.value,
        category:categoryEl.current.value
      }
    }).then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))


    })
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select className="custom-select" id="category" ref={categoryEl}>
            {categories.map(category=>{
              return <option className="custom-option" value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
         <input 
          type="number" 
          className="custom-select"
          id="amount" 
          min="1" 
          step="1" 
          defaultValue={10}
          ref={amountEl} />
        </div>
        <div className="form-group">
            <button className='btn'>Generate</button>
        </div>
      </form>
      <div className="container">

        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;


