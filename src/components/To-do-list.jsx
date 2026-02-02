import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaHandPointUp } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";



export const ToDoList = () => {
  const [tasks, setTask] = useState(()=>{
    const saved = localStorage.getItem('tasking')
    return saved ? JSON.parse(saved) : ['Meditate','Workout']

  });

  useEffect(()=>{
    localStorage.setItem("tasking",JSON.stringify(tasks))
  },[tasks])
  const [newTask, setNewTask] = useState("");
  const [completed, setCompleted] = useState(true);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function toAddTheTask() {
    if (newTask.trim() !== "" && newTask.length > 4) {
      setTask((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function toDeleteTheTask(index) {
    const toDeleteTask = tasks.filter((ele, i) => i !== index);
    setTask(toDeleteTask);
  }




  function isTaskCompleted() {
    setCompleted((prev) => !prev);
  }

  function toMoveTheTaskUp(index) {
    if (index > 0 ) {

      const moveTaskUp = [...tasks];
      [moveTaskUp[index], moveTaskUp[index - 1]] = [moveTaskUp[index - 1], moveTaskUp[index]] // swapping the index
      setTask(moveTaskUp)
    }
    
  }

  function toMoveTheTaskDown(index) {

    if(index < tasks.length - 1) {
        const moveTaskDown = [...tasks];
        [moveTaskDown[index],moveTaskDown[index + 1]] = [moveTaskDown[index + 1], moveTaskDown[index]]
        setTask(moveTaskDown)
      }
      

  }
  return (
    <div className="flex flex-col justify-center h-[100vh] items-center">
      <h1 className="text-6xl font-bold text-black">To Do List</h1>
      <div className="flex justify-center items-center mt-10">
        <input
          type="text"
          placeholder="Enter your task"
          value={newTask}
          onChange={handleInputChange}
          className="border-2 focus:outline-none   text-white placeholder-white  px-5 py-2 rounded-full border-black  mx-2"
        />
        <button
          onClick={toAddTheTask}
          className="bg-black w-20 rounded-full h-11 font-bold text-white px-2"
        >
          Add
        </button>
      </div>
      <ul className="  m-3 px-3 py-2  gap-3 text-xl  flex  text-white flex-col    list-inside">
        {tasks.map((task, index) => (
          <li
            className="mt-4 flex-wrap  px-3 gap-7 py-2 text-xl  border-2 rounded-4xl border-black flex justify-between items-center"
            key={index}
          >
            <input
              type="checkbox"
              className="cursor-pointer  shrink-0"
              value={completed}
              onChange={isTaskCompleted}
            />

            <span className="text-2xl  flex-1">{task}</span>

            <button>
              <FaHandPointUp onClick={() => toMoveTheTaskUp(index)} className="shrink-0 cursor-pointer" />
            </button>
            <button >
              <FaHandPointDown onClick={() => toMoveTheTaskDown(index)} className="shrink-0 mx3 cursor-pointer" />
            </button>
            <button
              onClick={() => toDeleteTheTask(index)}
              className=" px-3 shrink-0 text-[18px]  cursor-pointer rounded-full  text-white ml-5"
            >
              <MdDelete size={19} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
