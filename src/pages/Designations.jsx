import { useState } from "react";

const designationOptions = [
  "Admin",
  "HR",
  "Nurse",
  "Caregiver",
  "Housekeeping",
  "Receptionist",
];

const Designation = () => {
  const [showForm, setShowForm] = useState(false);
  const [designationName, setDesignationName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [designations, setDesignations] = useState([
    { id: 1, name: "Admin", description: "System Administrator", status: "Active" },
    { id: 2, name: "HR", description: "Human Resource Department", status: "Active" },
    { id: 3, name: "Nurse", description: "Patient Care", status: "Inactive" },
  ]);

  const resetForm = () => {
    setDesignationName("");
    setDescription("");
    setStatus("Active");
    setEditId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowForm(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setShowForm(false);
  };

  const handleSaveDesignation = (e) => {
    e.preventDefault();
    if (!designationName) {
      alert("Please select a designation");
      return;
    }

    const exists = designations.some(
      (item) => item.name.toLowerCase() === designationName.toLowerCase() && item.id !== editId
    );

    if (exists) {
      alert("Designation already exists!");
      return;
    }

    if (editId !== null) {
      setDesignations(
        designations.map((item) =>
          item.id === editId ? { ...item, name: designationName, description, status } : item
        )
      );
    } else {
      const nextId = designations.length > 0 ? Math.max(...designations.map((item) => item.id)) + 1 : 1;
      setDesignations([...designations, { id: nextId, name: designationName, description, status }]);
    }
    handleCloseModal();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setDesignationName(item.name);
    setDescription(item.description);
    setStatus(item.status);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDesignations(designations.filter((item) => item.id !== id));
  };

  const filteredData = designations.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Designation Management</h1>
        <p className="text-gray-500 text-sm">Manage employee designations for your organization.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border p-4 md:p-6">
        {/* Header Section (Search & Add Button) */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-5">
          <h2 className="text-xl font-semibold">Designation List</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={handleOpenAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg whitespace-nowrap"
            >
              + Add Designation
            </button>
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">{editId !== null ? "Edit Designation" : "Add Designation"}</h2>
                <button onClick={handleCloseModal} className="text-2xl hover:text-gray-600">&times;</button>
              </div>
              <form onSubmit={handleSaveDesignation} className="space-y-4">
                <select value={designationName} onChange={(e) => setDesignationName(e.target.value)} className="w-full border rounded-lg px-4 py-3">
                  <option value="">Select Designation</option>
                  {designationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" className="w-full border rounded-lg px-4 py-3" />
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded-lg px-4 py-3">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={handleCloseModal} className="border px-4 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">{editId !== null ? "Update" : "Save"}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Responsive Table */}
        <div className="space-y-4 md:hidden">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">ID: {item.id}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-6 text-center text-gray-500">No Designations Found</div>
          )}
        </div>

        <div className="hidden md:block overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">ID</th>
                <th className="p-4 text-left whitespace-nowrap">Designation</th>
                <th className="p-4 text-left whitespace-nowrap">Description</th>
                <th className="p-4 text-center whitespace-nowrap">Status</th>
                <th className="p-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{item.id}</td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 text-gray-600">{item.description}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">No Designations Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Designation;