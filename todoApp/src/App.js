import logo from './logo.svg';
import './App.css';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';
import { useState } from 'react';



function App() {
  
  const[todos,setTodos]=useState([]);
  
  const createTodo = (newTodo)=>{
    setTodos([...todos,newTodo])  /* tüm diziyi çıkarıp en sonra ekler. yani spread yapısı */
  }

  const deleteTodo = (id)=>{
     const deneme =todos.filter((todo)=> todo.id!=id) 
    setTodos(deneme)
    /* setTodos([...todos.filter((todo)=>todo.id!=id)]) */

  }
   
  const updateTodo =  (newTodo)=>{
       
      const updatedTodos= todos?.map((todo)=>{
        if(todo.id!=newTodo.id){
          return todo
        }
         return newTodo
       })
     setTodos(updatedTodos)
  
  
  }
  
  return (
    <div className="App">
       <TodoCreate onCreateTodo={createTodo}/>
       <TodoList 
       todos = {todos}
       deleteTodo={deleteTodo}
       guncelTodo={updateTodo}
       />
       
       
    </div>
  );
}

export default App;
