import { CheckCircle2, ClipboardList, Clock3, Users } from "lucide-react";
import { Card } from "../components/card";

const Dashboard = ({ employees = [], tasks = [] }) => {
  const totalEmployees = employees.length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  
  const recentEmployees = [...employees].reverse().slice(0, 5);
  const recentTasks = [...tasks].reverse().slice(0, 5);

  return (
    <div className="bg-gray-100 min-h-screen p-2">
      {/* Heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 mt-1">Welcome to Employee Management System</p>
        </div>
       
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Employees</p>
              <h3 className="text-3xl font-bold mt-2">{totalEmployees}</h3>
            </div>
            <Users size={42} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Tasks</p>
              <h3 className="text-3xl font-bold mt-2">{totalTasks}</h3>
            </div>
            <ClipboardList size={42} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Pending Tasks</p>
              <h3 className="text-3xl font-bold mt-2">{pendingTasks}</h3>
            </div>
            <Clock3 size={42} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Completed Tasks</p>
              <h3 className="text-3xl font-bold mt-2">{completedTasks}</h3>
            </div>
            <CheckCircle2 size={42} />
          </div>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Employees List */}
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Employees</h3>
          <ul className="space-y-2">
            {recentEmployees.length > 0 ? (
              recentEmployees.map((employee) => (
                <li key={employee.id} className="flex justify-between items-center border-b pb-2 text-sm text-gray-700">
                  <span className="font-medium">{employee.name}</span>
                  <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">{employee.designation}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">No employees added yet.</li>
            )}
          </ul>
        </Card>

        {/* Recent Tasks List */}
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Tasks</h3>
          <ul className="space-y-2">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <li key={task.id} className="flex justify-between items-center border-b pb-2 text-sm text-gray-700">
                  <span className="font-medium">{task.title}</span>
                  <span className={`px-2 py-1 rounded-md text-xs ${
                    task.status === "Completed" ? "bg-green-100 text-green-700" :
                    task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {task.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">No tasks added yet.</li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;