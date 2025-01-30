import React, { useState } from 'react'
import '../css/Todo.css'
import { useDispatch } from 'react-redux'
import { TodoState } from '../types/todoInitialState';
import { createTodo } from '../redux/slices/todoSlice';

function TodoCreate() {
  
  const dispatch=useDispatch();
  const [input,setInput]=useState<string>('');
  
  function handle(){
    if(input.trim().length==0){
      alert('todo giriniz')
      return
    }else{
      const newTodo:TodoState={
        id:Math.floor(Math.random()*99999),
        content:input,
      }
     dispatch(createTodo(newTodo));
     setInput('');
    }
   
  }
  
  return (
    <div className='todo-card'>
      
      <div className='input-card'>
        <input 
         value={input}
         onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInput(e.target.value)}
        className='todo-input' type="text" placeholder='Todo Oluşturun' />  
      </div>  
      
      <div >
        <button className='button-card' onClick={handle}>Oluştur</button>
      </div>

    </div>
  )
}

export default TodoCreate