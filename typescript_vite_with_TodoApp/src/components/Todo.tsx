import React, { useState } from 'react'
import { TiDelete } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import '../css/TodoList.css'
import { TodoState } from '../types/todoInitialState';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '../redux/slices/todoSlice';
import '../css/Todo.css'
import { SiTicktick } from "react-icons/si";

interface TodoProps{
  todoprops:TodoState,
}

function Todo(props:TodoProps) {               /* ÖNEMLi */
 
  const{todoprops}=props;
  const{id,content}=todoprops;
  const [loading,setLoading] = useState<boolean>(false);
  const [input,setInput]=useState<string>(content);

  
  const dispatch = useDispatch();
 
  function handleDelete(){
    dispatch(deleteTodo(todoprops));
  }
  
  function handleEdit(){
     setLoading(true);
  }
  function handleEditClose(){
   if(input){
    const updatedTodo:TodoState={
      id:id,
      content:input,
    }
    dispatch(editTodo(updatedTodo));
   }
    
    setLoading(false);
  }
  return (
    <div className='todoList-card'>
    <div>
        {loading ? <input 
         value={input}
         onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInput(e.target.value)}
        className='todo-input' type="text" />:content}
    </div>

    <div>
    <TiDelete onClick={handleDelete} style={{fontSize:'25px',marginBottom:'-2px',cursor:'pointer'}}/>
    {loading?<SiTicktick onClick={handleEditClose} style={{fontSize:'20px',marginBottom:'2px',cursor:'pointer'}}/>:<FiEdit2 onClick={handleEdit} style={{fontSize:'20px',marginBottom:'2px',cursor:'pointer'}}/>
    }
    </div>
</div>
  )
}

export default Todo