import { useState } from "react";
import { useForm } from "react-hook-form";

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
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [designations, setDesignations] = useState([
    { id: 1, name: "Admin", description: "System Administrator", status: "Active" },
    { id: 2, name: "HR", description: "Human Resource Department", status: "Active" },
    { id: 3, name: "Nurse", description: "Patient Care", status: "Inactive" },
  ]);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "Active",
    },
  });

  const handleOpenAddModal = () => {
    reset({ name: "", description: "", status: "Active" });
    setEditId(null);
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const onSubmit = (data) => {
    const exists = designations.some(
      (item) => item.name.toLowerCase() === data.name.toLowerCase() && item.id !== editId
    );

    if (exists) {
      alert("Designation already exists!");
      return;
    }

    if (editId !== null) {
      setDesignations(
        designations.map((item) =>
          item.id === editId ? { ...item, ...data } : item
        )
      );
    } else {
      const nextId = designations.length > 0 ? Math.max(...designations.map((item) => item.id)) + 1 : 1;
      setDesignations([...designations, { id: nextId, ...data }]);
    }
    handleCloseModal();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setValue("name", item.name);
    setValue("description", item.description);
    setValue("status", item.status);
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
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Designation Management</h1>
        <p className="text-gray-500 text-sm">Manage employee designations for your organization.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border p-4 md:p-6">
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <select {...register("name", { required: true })} className="w-full border rounded-lg px-4 py-3">
                  <option value="">Select Designation</option>
                  {designationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <textarea {...register("description")} rows="4" placeholder="Enter description" className="w-full border rounded-lg px-4 py-3" />
                <select {...register("status")} className="w-full border rounded-lg px-4 py-3">
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

        {/* Table/List View */}
        <div className="space-y-4 md:hidden">
          {filteredData.map((item) => (
            <div key={item.id} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{item.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Designation</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.id}</td>
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.description}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{item.status}</span>
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline mx-2">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline mx-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Designation;