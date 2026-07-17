import { useState } from "react";

const designationOptions = [
  "Admin", "HR", "Nurse", "Caregiver", "Housekeeping", "Receptionist",
];

const Employee = ({ employees, onAddEmployee, onUpdateEmployee, onDeleteEmployee }) => {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [codeError, setCodeError] = useState("");

  const [formData, setFormData] = useState({
    code: "", name: "", designation: "", email: "", mobile: "", status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "code") setCodeError("");
  };

  const resetForm = () => {
    setFormData({ code: "", name: "", designation: "", email: "", mobile: "", status: "Active" });
    setEditId(null);
    setCodeError("");
  };

  const handleCloseForm = () => { setShowForm(false); resetForm(); };
  const handleOpenForm = () => { resetForm(); setShowForm(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.designation || !formData.email || !formData.mobile) {
      alert("Please fill all fields");
      return;
    }
    const isDuplicate = employees.some(
      (emp) => emp.code.toLowerCase() === formData.code.trim().toLowerCase() && emp.id !== editId
    );
    if (isDuplicate) {
      setCodeError("This Employee Code already exists!");
      return;
    }
    editId ? onUpdateEmployee({ ...formData, id: editId }) : onAddEmployee({ ...formData });
    handleCloseForm();
  };

  const handleEdit = (employee) => { setFormData(employee); setEditId(employee.id); setShowForm(true); };
  const filteredEmployees = employees?.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Employee Management</h1>
        <p className="text-gray-500 text-sm md:text-base">Manage employees for your organization.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-5">
          <h2 className="text-xl font-semibold">Employee List</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full sm:w-64 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button onClick={handleOpenForm} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg whitespace-nowrap">
              + Add Employee
            </button>
          </div>
        </div>

        {/* Modal Form (Same as before) */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">{editId ? "Edit Employee" : "Add Employee"}</h2>
                <button onClick={handleCloseForm} className="text-2xl hover:text-gray-600">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="code" placeholder="Employee Code" value={formData.code} onChange={handleChange} className={`border rounded-lg px-4 py-3 ${codeError ? "border-red-500" : ""}`} />
                  <input type="text" name="name" placeholder="Employee Name" value={formData.name} onChange={handleChange} className="border rounded-lg px-4 py-3" />
                  <select name="designation" value={formData.designation} onChange={handleChange} className="border rounded-lg px-4 py-3">
                    <option value="">Select Designation</option>
                    {designationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border rounded-lg px-4 py-3" />
                  <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="border rounded-lg px-4 py-3" />
                  <select name="status" value={formData.status} onChange={handleChange} className="border rounded-lg px-4 py-3">
                    <option>Active</option> <option>Inactive</option>
                  </select>
                </div>
                {codeError && <p className="text-red-500 text-sm">{codeError}</p>}
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={handleCloseForm} className="border px-4 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">{editId ? "Update" : "Save"}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mobile View (Cards) */}
        <div className="space-y-4 md:hidden">
          {filteredEmployees.length > 0 ? filteredEmployees.map((emp) => (
            <div key={emp.id} className="border rounded-xl p-4 bg-slate-50 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{emp.name}</h3>
                  <p className="text-sm text-gray-500">Code: {emp.code}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {emp.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Designation: {emp.designation}</p>
              <p className="text-sm text-gray-600">Email: {emp.email}</p>
              <p className="text-sm text-gray-600 mb-4">Mobile: {emp.mobile}</p>
              <div className="flex gap-3 border-t pt-3">
                <button onClick={() => handleEdit(emp)} className="text-blue-600 font-medium">Edit</button>
                <button onClick={() => onDeleteEmployee(emp.id)} className="text-red-600 font-medium">Delete</button>
              </div>
            </div>
          )) : <div className="text-center p-6 text-gray-500">No Employees Found</div>}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Designation</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Mobile</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{emp.code}</td>
                  <td className="p-4">{emp.name}</td>
                  <td className="p-4">{emp.designation}</td>
                  <td className="p-4">{emp.email}</td>
                  <td className="p-4">{emp.mobile}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:underline mr-4">Edit</button>
                    <button onClick={() => onDeleteEmployee(emp.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              )) : <tr><td colSpan="7" className="text-center py-6 text-gray-500">No Employees Found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;