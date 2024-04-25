import React, { useState } from 'react'
const questions=[
    {
        id:3457,
        question:"What language is React based on ?",
        answer:"Javascript"

    },
    {
        id:7336,
        question:"What are the building blocks of React apps?",
        answer:"Component"
    },
    {
        id:8832,
        question:"What's the name of the syntax we use to describe a UI in React?",
        answer:"JSX"
    },
    {
        id:1297,
        question:"How to pass data from parent to child components?",
        answer:"Props"
    },
    {
        id:9103,
        question:"How to give components memory?",
        answer:"useState Hook"
    },
    {
        id:2002,
        question:"What do we call an input element that is completely synchronized with?",
        answer:"Component"
    },

]

const FlashCard = () => {
    const[selectId,setSelectedId]=useState(null);
    function handleClick(id){
        setSelectedId(id !== selectId ? id: null)
        console.log(id,selectId)
    }
    return (
    <div className='flashcards'>
      {questions.map((question)=>(
        <div 
        onClick={()=>handleClick(question.id)}
        key={question.id} 
        className={question.id === selectId ? 'selected':''}>

        <p>
            {question.id === selectId ? question.answer :question.question}
        </p>
       
        </div>
      ))}
    </div>
  )
}

export default FlashCard;
