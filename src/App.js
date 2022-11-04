import "./App.css";
import { useEffect, useState } from "react";
// import { BrowserRouter as Router , Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);
  //fetch from server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:50001/tasks");
    const data = await res.json();
    // console.log(data);
    return data;
  };
  //fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:50001/tasks/${id}`);
    const data = await res.json();
    // console.log(data);
    return data;
  };
  //add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:50001/tasks`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = {id , ...task};
    // setTasks([...tasks , newTask]);
    // console.log(task , id)
  };
  // delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:50001/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
    // console.log('delete' , id)
  };
  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:50001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      <>
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "No Task To Show"
        )}
      </>

      <Footer />
    </div>
  );
}

export default App;
