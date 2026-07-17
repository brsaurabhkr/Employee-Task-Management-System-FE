import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

const Register = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form is valid, proceed with register:", data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            REG
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mt-2 mb-8">Sign up for Employee Management System</p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required." })}
              className={`w-full border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { 
                required: "Email is required.",
                pattern: { value: /\S+@\S+\.\S+/, message: "Please enter a valid email address." }
              })}
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { 
                required: "Password is required.",
                minLength: { value: 6, message: "Password must be at least 6 characters long." }
              })}
              className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
          
          <p className="text-center text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
          </p>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">© 2026 Employee Management System</p>
      </div>
    </div>
  );
};

export default Register;