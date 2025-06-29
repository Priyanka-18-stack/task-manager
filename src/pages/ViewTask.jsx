import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTasks } from '../utilis/Storage';

export default function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = getTasks();
    const found = tasks.find((t) => t.id === Number(id));
    if (found) setTask(found);
    else navigate('/');
  }, [id, navigate]);

  if (!task) return <p>Loading...</p>;

  return (
 <div className="fade-in">
      <h2>Task Details</h2>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? '✅ Completed' : '❌ Pending'}
      </p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
