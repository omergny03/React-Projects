import React from 'react'
import '../css/Todo.css'
import Todo from './Todo'

function TodoList({todos,deleteTodo,guncelTodo}) {
  return (
    <div className='todoList'>
        <div style={{width:'100%'}}>
          {

           todos && todos?.map((todo)=>(
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                guncelTodo={guncelTodo}
              
              />
             

            ))
          }
        </div>
        
    </div>
  )
}

export default TodoList