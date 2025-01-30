import React from 'react'
import '../css/TodoList.css'
import Todo from './Todo'
import { useSelector } from 'react-redux'
import { TodoState } from '../types/todoInitialState'
import { RootState } from '../redux/store'


function TodoList() {
   
 const {todos}=useSelector((state:RootState)=>state.todo)

 return (    
    <div className='todolist-body'>
      {todos.map((todo:TodoState)=>(
         <Todo
         key={todo.id}
         todoprops={todo}
         />
 
      ))}
    </div>
  )
}

export default TodoList