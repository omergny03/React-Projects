import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'

function App() {
  
  return (
   <div className='home'>
     <TodoCreate/>
     <TodoList/>
   </div>
  )
}

export default App
