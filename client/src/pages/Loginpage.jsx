import { Mail, Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logo from '../assets/Vector.png';
import { useLoginMyUser } from '../apis/MyUserAuth';

// Zod schema
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'student'], {
    errorMap: () => ({ message: 'Please select a role' })
  }),
});

export function Loginpage() {
  const {loginMyUser, isPending} = useLoginMyUser();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
        await loginMyUser({
        email: data.email,
        password: data.password
      })
      toast.success("Login successful!");
      console.log("Login Data:", data);

      // navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <img src={Logo} width={200} height={200} alt="logo" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600 mt-2">Enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...register('email')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition 
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                {...register('password')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition 
                ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                {...register('role')}
                className={`w-full pl-10 pr-4 py-3 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-lg outline-none transition appearance-none bg-white`}
                onFocus={(e) => e.target.style.borderColor = '#6C8F5E'}
                onBlur={(e) => !errors.role && (e.target.style.borderColor = '#d1d5db')}
              >
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="counsellor">Counsellor</option>
                <option value="Tech team">Tech Team</option>
                {/* <option value="counsellor">Counsellor</option> */}
              </select>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Register link */}
          <p
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Don't have an account? Register
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
            style={{ backgroundColor: '#6C8F5E' }}
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
