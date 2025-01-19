import React, { useState } from 'react'
import { CiBookmarkRemove } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import '../css/Todo.css'

function Todo({todo,deleteTodo,guncelTodo}) {
 
  const[editable,setEditable]=useState(false)
  const[newTodo,setNewTodo]=useState(todo.content)

  const removeTodo= ()=>{
     deleteTodo(todo.id)
  }
  
  const updateTodo = ()=>{
    const response={
      id:todo.id,
      content:newTodo
    }
    guncelTodo(response)
   setEditable(false)
  }

  
  
  return (
    <div className='todo'>
      <div style={{padding:'10px'}}>
        {
          editable? <input className='scanner' type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} /> : todo.content
        }
      </div>
      
      <div style={{padding:'10px'}}>
      
      <CiBookmarkRemove onClick={removeTodo} style={{fontSize:'25px', cursor:'pointer'}}/>
       {
         editable? <FaCheck  style={{fontSize:'22px', cursor:'pointer'}} onClick={updateTodo}/> : <FaRegEdit style={{fontSize:'27px',cursor:'pointer'}} onClick={()=>{setEditable(true)}} />
       }
      
      
      
      </div> 

    
   </div>
  )
}

export default Todo