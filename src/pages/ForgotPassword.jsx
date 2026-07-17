import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    console.log("Send reset link to:", data.email);
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            ?
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800">Forgot Password</h2>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              {...register("email", { 
                required: "Email is required.",
                pattern: { 
                  value: /\S+@\S+\.\S+/, 
                  message: "Please enter a valid email address." 
                }
              })}
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Send Reset Link
          </button>
          
          <div className="text-center text-sm">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">© 2026 Employee Management System</p>
      </div>
    </div>
  );
};

export default ForgotPassword;