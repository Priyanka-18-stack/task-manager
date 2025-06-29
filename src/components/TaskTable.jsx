import { useState } from "react";
import "./TaskTable.css";

export default function TaskTable({ tasks, onEdit, onDelete, itemsPerPage = 5 }) {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    dueFrom: "",
    dueTo: "",
  });

  const [sortKeys, setSortKeys] = useState([
    { key: "title", asc: true },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortKeys((prevKeys) => {
      const existing = prevKeys.find((k) => k.key === key);
      if (existing) {
        return prevKeys.map((k) =>
          k.key === key ? { ...k, asc: !k.asc } : k
        );
      } else {
        return [{ key, asc: true }, ...prevKeys];
      }
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    if (filters.status !== "all" && task.status !== filters.status) return false;
    if (filters.dueFrom && task.dueDate < filters.dueFrom) return false;
    if (filters.dueTo && task.dueDate > filters.dueTo) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    for (let { key, asc } of sortKeys) {
      let valA = a[key] || "";
      let valB = b[key] || "";

      if (key === "dueDate") {
        valA = new Date(valA);
        valB = new Date(valB);
      } else {
        valA = valA.toString().toLowerCase();
        valB = valB.toString().toLowerCase();
      }

      if (valA < valB) return asc ? -1 : 1;
      if (valA > valB) return asc ? 1 : -1;
    }
    return 0;
  });

  const totalItems = sortedTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedTasks = sortedTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  const renderSortArrow = (key) => {
    const current = sortKeys.find((k) => k.key === key);
    return current ? (
      <span className="sort-arrow">{current.asc ? "▲" : "▼"}</span>
    ) : null;
  };

  return (
    <div className="task-table-container">
      <div className="filters">
        <input
          type="search"
          name="search"
          placeholder="Search by title"
          value={filters.search}
          onChange={handleFilterChange}
        />

        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="all">All statuses</option>
          <option value="pending">⏳ Pending</option>
          <option value="completed">✅ Completed</option>
        </select>

        <label>
          Due from:
          <input
            type="date"
            name="dueFrom"
            value={filters.dueFrom}
            onChange={handleFilterChange}
          />
        </label>

        <label>
          Due to:
          <input
            type="date"
            name="dueTo"
            value={filters.dueTo}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      {/* Optional emoji legend */}
      

      <table className="task-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Title {renderSortArrow("title")}
            </th>
            <th onClick={() => handleSort("dueDate")}>
              Due Date {renderSortArrow("dueDate")}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {renderSortArrow("status")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.length === 0 ? (
            <tr>
              <td className="no-tasks" colSpan="4">
                No tasks found matching your criteria.
              </td>
            </tr>
          ) : (
            paginatedTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.dueDate || "-"}</td>
                <td className={`status ${task.status}`}>
                  {task.status === "completed" ? "✅ Completed" : "⏳ Pending"}
                </td>
                <td className="actions">
                  <button onClick={() => onEdit(task.id)}>Edit</button>
                  <button onClick={() => onDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={currentPage === pageNum ? "active-page" : ""}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
