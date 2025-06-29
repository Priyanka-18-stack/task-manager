import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm.jsx";
import { loadTasks, saveTasks } from "../utilis/Storage.js";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = loadTasks();
    const found = tasks.find((t) => t.id === id);
    if (!found) {
      alert("Task not found");
      navigate("/");
      return;
    }
    setTask(found);
  }, [id, navigate]);

  const handleSubmit = (updatedTask) => {
    const tasks = loadTasks();
    const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t));
    saveTasks(updatedTasks);
    navigate("/");
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Edit Task</h2>
      <TaskForm onSubmit={handleSubmit} initialData={task} />
    </div>
  );
}
