import React, { useState } from 'react'
import '../css/Todo.css'

function TodoCreate({onCreateTodo}) {
  
   const[input,setInput]=useState("");
   
   const clearInput =()=>{
      setInput('');
   }
   
   const createTodo= ()=>{
      if(!input){
        return;
      }
      else{
        const response={
            id:Math.floor(Math.random()*9999),
            content:input
        }
        onCreateTodo(response) 
        clearInput(); 
    }
     
    }
  
    return (
    <div className='todoCreate'>
       
       <div className='scanner-div'>
          <input className='scanner' type="text" placeholder='Todo Giriniz' value={input} onChange={(e)=>setInput(e.target.value)} />  
       </div>
        
       <div className='button-div'>
        <button onClick={createTodo}  
         className='button'>Oluştur</button>
       </div>
         
    </div>
  )
}

export default TodoCreate