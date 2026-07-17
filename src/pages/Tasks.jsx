import { useState } from "react";

const Task = ({ tasks = [], employees = [], onAddTask, onUpdateTask, onDeleteTask }) => {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    code: "", title: "", description: "", employee: "", priority: "Medium", dueDate: "", status: "Pending",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({ code: "", title: "", description: "", employee: "", priority: "Medium", dueDate: "", status: "Pending" });
    setEditId(null);
  };

  const handleCloseForm = () => { resetForm(); setShowForm(false); };
  const handleOpenForm = () => { resetForm(); setShowForm(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title || !formData.employee || !formData.dueDate) {
      alert("Please fill all required fields");
      return;
    }
    editId ? onUpdateTask({ ...formData, id: editId }) : onAddTask({ ...formData });
    handleCloseForm();
  };

  const handleEdit = (task) => { setFormData(task); setEditId(task.id); setShowForm(true); };

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Task Management</h1>
        <p className="text-gray-500 text-sm md:text-base">Manage tasks and assignments for your team.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-5">
          <h2 className="text-xl font-semibold">Task List</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Search Title..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-lg px-4 py-2 w-full sm:w-48 outline-none focus:ring-2 focus:ring-blue-400" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400">
              <option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option>
            </select>
            <button onClick={handleOpenForm} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg whitespace-nowrap">+ Add Task</button>
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">{editId ? "Edit Task" : "Create Task"}</h2>
                <button onClick={handleCloseForm} className="text-2xl hover:text-gray-600">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="code" placeholder="Task Code" value={formData.code} onChange={handleChange} className="border rounded-lg px-4 py-3" />
                  <input type="text" name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} className="border rounded-lg px-4 py-3" />
                  <select name="employee" value={formData.employee} onChange={handleChange} className="border rounded-lg px-4 py-3">
                    <option value="">Assigned To</option>
                    {employees.map((emp) => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                  </select>
                  <select name="priority" value={formData.priority} onChange={handleChange} className="border rounded-lg px-4 py-3">
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                  <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="border rounded-lg px-4 py-3" />
                  <select name="status" value={formData.status} onChange={handleChange} className="border rounded-lg px-4 py-3">
                    <option>Pending</option><option>In Progress</option><option>Completed</option>
                  </select>
                </div>
                <textarea rows="3" name="description" placeholder="Task Description" value={formData.description} onChange={handleChange} className="w-full border rounded-lg px-4 py-3" />
                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={handleCloseForm} className="border px-4 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">{editId ? "Update" : "Save"}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {filteredTasks.length > 0 ? filteredTasks.map((task) => (
            <div key={task.id} className="border rounded-xl p-4 bg-slate-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${task.status === "Completed" ? "bg-green-100 text-green-700" : task.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>{task.status}</span>
              </div>
              <p className="text-sm text-gray-600">Assigned: {task.employee}</p>
              <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
              <p className="text-sm font-medium mt-1">Priority: {task.priority}</p>
              <div className="flex gap-3 mt-3 pt-3 border-t">
                <button onClick={() => handleEdit(task)} className="text-blue-600 font-medium">Edit</button>
                <button onClick={() => onDeleteTask(task.id)} className="text-red-600 font-medium">Delete</button>
              </div>
            </div>
          )) : <div className="text-center py-6 text-gray-500">No Tasks Found</div>}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Assigned To</th>
                <th className="p-4 text-center">Priority</th>
                <th className="p-4 text-left">Due Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{task.code}</td>
                  <td className="p-4 font-medium">{task.title}</td>
                  <td className="p-4">{task.employee}</td>
                  <td className="p-4 text-center"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.priority === "High" ? "bg-red-100 text-red-700" : task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-700"}`}>{task.priority}</span></td>
                  <td className="p-4">{task.dueDate}</td>
                  <td className="p-4 text-center"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === "Completed" ? "bg-green-100 text-green-700" : task.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>{task.status}</span></td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleEdit(task)} className="text-blue-600 hover:underline mr-4">Edit</button>
                    <button onClick={() => onDeleteTask(task.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              )) : <tr><td colSpan="7" className="text-center py-6 text-gray-500">No Tasks Found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;