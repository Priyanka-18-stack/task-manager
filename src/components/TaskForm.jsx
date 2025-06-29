import useForm from "../hooks/useTaskForm";

export default function TaskForm({ onSubmit, initialData = {} }) {
  const [values, handleChange] = useForm({
    title: initialData.title || "",
    description: initialData.description || "",
    dueDate: initialData.dueDate || "",
    status: initialData.status || "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title.trim()) {
      alert("Title is required");
      return;
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </label>

      <label>
        Due Date:
        <input
          type="date"
          name="dueDate"
          value={values.dueDate}
          onChange={handleChange}
        />
      </label>

      <label>
        Status:
        <select name="status" value={values.status} onChange={handleChange}>
          <option value="pending">⏳Pending</option>
          <option value="completed"> ✅Completed</option>
        </select>
      </label>

      <button type="submit">Save Task</button>
    </form>
  );
}
