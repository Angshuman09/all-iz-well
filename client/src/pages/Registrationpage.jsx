import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Mail, Lock, User, Shield } from 'lucide-react';
import { useCreateMyUser, useVerifyMyUser } from '../apis/MyUserAuth';
import { useNavigate } from 'react-router-dom';
// Zod validation schema
const registrationSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Email is invalid'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
  role: z.enum(['admin', 'student', 'counsellor'], {
    errorMap: () => ({ message: 'Please select a role' })
  })
});

export default function RegistrationForm() {
  const {createMyUser, isPending, isSuccess} = useCreateMyUser();
  const {verifyMyUser} = useVerifyMyUser();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema)
  });

  const onSubmit = async (data) => {
try {
    await createMyUser({
            email: data.email,
            password: data.password,
            role: data.role
        })
        setRegistrationData(data);
        setStep(2);
} catch (error) {
    console.error("Registration error:", error);
}
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
    //   alert(`Registration successful!\nEmail: ${registrationData.email}\nRole: ${registrationData.role}\nOTP: ${otpValue}`);
    verifyMyUser({
        email: registrationData.email,
        otp: otpValue
    });
    navigate('/continue');
    } else {
      alert('Please enter complete 6-digit OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#A8C690' }}>
            <Shield className="w-8 h-8" style={{ color: '#6C8F5E' }} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {step === 1 ? 'Create Account' : 'Verify OTP'}
          </h1>
          <p className="text-gray-600 mt-2">
            {step === 1 ? 'Fill in your details to register' : 'Enter the 6-digit code sent to your email'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg outline-none transition`}
                  placeholder="you@example.com"
                  onFocus={(e) => e.target.style.borderColor = '#6C8F5E'}
                  onBlur={(e) => !errors.email && (e.target.style.borderColor = '#d1d5db')}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  {...register('password')}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg outline-none transition`}
                  placeholder="••••••••"
                  onFocus={(e) => e.target.style.borderColor = '#6C8F5E'}
                  onBlur={(e) => !errors.password && (e.target.style.borderColor = '#d1d5db')}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

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
                </select>
              </div>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg font-semibold transition duration-200 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#6C8F5E' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a7a4d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6C8F5E'}
            >
              Continue to Verification
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#f0f4ed' }}>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {registrationData?.email}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Role:</span> {registrationData?.role.charAt(0).toUpperCase() + registrationData?.role.slice(1)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter 6-Digit OTP
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg outline-none transition"
                    onFocus={(e) => e.target.style.borderColor = '#6C8F5E'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg font-semibold transition duration-200 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#6C8F5E' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a7a4d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6C8F5E'}
            >
              Verify & Register
            </button>

            <button
              onClick={() => setStep(1)}
              type="button"
              className="w-full py-2 rounded-lg font-medium transition duration-200"
              style={{ color: '#6C8F5E' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f4ed'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Back to Registration
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm font-medium"
                style={{ color: '#6C8F5E' }}
                onMouseEnter={(e) => e.target.style.color = '#5a7a4d'}
                onMouseLeave={(e) => e.target.style.color = '#6C8F5E'}
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}