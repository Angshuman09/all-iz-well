
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStudentForm } from "../apis/Student";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetActiveColleges } from "../apis/Colleges";
import { useState } from "react";
// ---------------- Schema ----------------
const formSchema = z.object({
  collegeName: z.string().min(1, "Select a college"),
  gender: z.string().min(1, "Select gender"),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => Number(val) >= 16 && Number(val) <= 40, {
      message: "Age must be between 16 and 40",
    }),
  collegeCode: z.string().min(3, "Invalid college code"),
  semester: z.string().min(1, "Select semester"),
});

// ---------------- Component ----------------
export default function StudentForm() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const {studentform, isPending} = useStudentForm();
  const {activeColleges} = useGetActiveColleges();
//const {collegeName, gender, age, collegeCode, semester} = req.body;
  const onSubmit = async (data) => {
    try {
    console.log("Form Data:", data);
    const response = await studentform({
        collegeName: data.collegeName,
        gender: data.gender,
        age: data.age,
        collegeCode: data.collegeCode,
        semester: data.semester
    })

    toast.success('registration successful');
    navigate('/student-dashboard');
    } catch (error) {
        toast.error('some errors occurs');
        console.log(`error: ${error}`);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-green-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        {/* Heading */}
        <h1 className="font-poppins font-bold text-[28px] text-green-900 mb-2">
          Student Registration
        </h1>

        <p className="font-poppins text-[16px] text-black/70 mb-6">
          Your information is confidential and used only for wellbeing support.
        </p>

        {/* College Name */}
        <label className="block mt-4 font-roboto text-[16px]">College Name</label>
        <select
          {...register("collegeName")}
          className={`w-full pl-10 pr-4 py-1 border rounded-lg outline-none transition appearance-none bg-white`}
        >
          <option value="">Select College</option>
          {/* <option value="ABC College">ABC College</option>
          <option value="XYZ Institute">XYZ Institute</option>
          <option value="Tech University">Tech University</option> */}
          {activeColleges?.data?.length === 0 ? (
        <option value="" disabled>No college found</option>
      ) : (
        activeColleges?.data?.map((college) => (
          <option key={college._id} value={college.name}>{college.name}</option>
        )))}
        </select>
        {errors.collegeName && (
          <p className="text-red-600 text-[13px] font-roboto mt-1">
            {errors.collegeName.message}
          </p>
        )}

        {/* Gender */}
        <label className="block mt-4 font-roboto text-[16px]">Gender</label>
        <select
          {...register("gender")}
          className={`w-full pl-10 pr-4 py-1 border rounded-lg outline-none transition appearance-none bg-white`}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-600 text-[13px] font-roboto mt-1">
            {errors.gender.message}
          </p>
        )}

        {/* Age */}
        <label className="block mt-4 font-roboto text-[16px]">Age</label>
        <input
          {...register("age")}
          type="number"
          placeholder="Enter your age"
          className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
        />
        {errors.age && (
          <p className="text-red-600 text-[13px] font-roboto mt-1">
            {errors.age.message}
          </p>
        )}

        {/* College Code */}
        <label className="block mt-4 font-roboto text-[16px]">College Code</label>
        <input
          {...register("collegeCode")}
          type="text"
          placeholder="Enter college code"
          className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
        />
        {errors.collegeCode && (
          <p className="text-red-600 text-[13px] font-roboto mt-1">
            {errors.collegeCode.message}
          </p>
        )}

        {/* Semester */}
        <label className="block mt-4 font-roboto text-[16px]">Semester</label>
        <select
          {...register("semester")}
          className={`w-full pl-10 pr-4 py-1 border rounded-lg outline-none transition appearance-none bg-white`}
        >
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
        {errors.semester && (
          <p className="text-red-600 text-[13px] font-roboto mt-1">
            {errors.semester.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-[#6C8F5E] text-white font-poppins font-semibold text-[16px] rounded-lg hover:scale-[1.02] transition-all"
        >
          Register & Continue
        </button>
      </form>
    </div>
  );
}
