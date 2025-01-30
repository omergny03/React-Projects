import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TodoInitialState, TodoState } from '../../types/todoInitialState'

const initialState:TodoInitialState = {
  todos:[],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTodo:(state:TodoInitialState,action:PayloadAction<TodoState>)=>{
          state.todos= [...state.todos,action.payload];
    },

    deleteTodo:(state:TodoInitialState,action:PayloadAction<TodoState>)=>{
          const extractTodos = state.todos.filter((todo:TodoState)=>todo.id!=action.payload.id);
          state.todos=extractTodos;
    },
    
    editTodo:(state:TodoInitialState,action:PayloadAction<TodoState>)=>{
       const findTodo = state.todos && state.todos.find((todo:TodoState)=> todo.id === action.payload.id); 
       if(findTodo){
        findTodo.content=action.payload.content;
       }else{
        alert('TODO BULUNAMADI!!!');
        return
       }
    }
  },
})


export const {createTodo,deleteTodo,editTodo} = todoSlice.actions

export default todoSlice.reducer