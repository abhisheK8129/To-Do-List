import { Route, Router, Routes } from "react-router-dom"
import { ToDoList } from "./components/to-do-list"



function App() {

  return (
    <>
    
    <Routes>
      <Route path="/" element={<ToDoList/>}></Route>
    </Routes>
    </>
  )
}

export default App
