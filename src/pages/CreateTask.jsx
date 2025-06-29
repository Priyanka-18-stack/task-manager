import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm.jsx";
import { loadTasks, saveTasks } from "../utilis/Storage.js";

export default function CreateTask() {
  const navigate = useNavigate();

  const handleSubmit = (task) => {
    const tasks = loadTasks();
    task.id = Date.now().toString();
    saveTasks([...tasks, task]);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Create New Task</h2>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
