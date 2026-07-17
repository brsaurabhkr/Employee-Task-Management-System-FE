import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import "./index.css";

import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";

import Dashboard from "./dashboard/Dashboard";
import Designations from "./pages/Designations";
import Employee from "./pages/Employee";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

type Employee = {
  id: number;
  code: string;
  name: string;
  designation: string;
  email: string;
  mobile: string;
  status: string;
};

type Task = {
  id: number;
  code: string;
  title: string;
  description: string;
  employee: string;
  priority: string;
  dueDate: string;
  status: string;
};

const initialEmployees: Employee[] = [
  {
    id: 1,
    code: "EMP001",
    name: "Rahul Sharma",
    designation: "Admin",
    email: "rahul@gmail.com",
    mobile: "9876543210",
    status: "Active",
  },
];

const initialTasks = [
  {
    id: 1,
    code: "TSK001",
    title: "Patient Checkup",
    description: "Daily patient monitoring",
    employee: "Rahul Sharma",
    priority: "High",
    dueDate: "2026-07-20",
    status: "Pending",
  },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const hideLayout = ["/login", "/register", "/forgot-password"].includes(location.pathname);

  
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const savedEmployees = localStorage.getItem("employeesData");
    return savedEmployees ? (JSON.parse(savedEmployees) as Employee[]) : initialEmployees;
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasksData");
    return savedTasks ? (JSON.parse(savedTasks) as Task[]) : initialTasks;
  });

 
  useEffect(() => {
    localStorage.setItem("employeesData", JSON.stringify(employees));
  }, [employees]);

 
  useEffect(() => {
    localStorage.setItem("tasksData", JSON.stringify(tasks));
  }, [tasks]);

  const addEmployee = (employee: Omit<Employee, "id">) => {
    setEmployees((prev) => [...prev, { ...employee, id: Date.now() }]);
  };

  const updateEmployee = (employee: Employee) => {
    setEmployees((prev) => prev.map((item) => (item.id === employee.id ? employee : item)));
  };

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const updateTask = (task: Task) => {
    setTasks((prev) => prev.map((item) => (item.id === task.id ? task : item)));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {!hideLayout && <Navbar onToggleSidebar={toggleSidebar} />}

      <div className="flex min-h-screen">
        {!hideLayout && <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />}

        <main className={`flex-1 p-6 ${hideLayout ? "min-h-screen flex items-center justify-center" : "mt-2 md:ml-72"}`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Dashboard employees={employees as any} tasks={tasks as any} />} />
            <Route path="/designation" element={<Designations />} />
            <Route
              path="/employees"
              element={
                <Employee
                  employees={employees as any}
                  onAddEmployee={addEmployee}
                  onUpdateEmployee={updateEmployee}
                  onDeleteEmployee={deleteEmployee}
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <Tasks
                  tasks={tasks as any}
                  employees={employees as any}
                  onAddTask={addTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}


 export default App;