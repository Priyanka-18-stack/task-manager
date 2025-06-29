import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskTable from "../components/TaskTable.jsx";
import Pagination from "../components/Pagination.jsx";
import { loadTasks, saveTasks } from "../utilis/Storage.js";

const PAGE_SIZE = 5;

export default function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this task?")) return;
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>📝Task Manager</h1>
      <button onClick={() => navigate("/create")}>Create New Task</button>
      <TaskTable tasks={paginatedTasks} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
