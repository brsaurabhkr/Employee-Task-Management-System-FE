import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    const newErrors = {};
    setLoginError("");

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { email, password } = formData;
    if (email === "admin@gmail.com" && password === "Password@123") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
      return;
    }

    setLoginError("Invalid admin email or password.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            EMS
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 mt-2 mb-8">Login to Employee Management System</p>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
          </p>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">© 2026 Employee Management System</p>
      </div>
    </div>
  );
};

export default Login;