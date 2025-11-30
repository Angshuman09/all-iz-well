import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminForm } from "../apis/Admin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ----------------- ZOD VALIDATION SCHEMA -----------------
const formSchema = z.object({
  collegeName: z.string().min(2, "College name is required"),
  collegeCode: z.string().min(2, "College code is required"),
  aisheCode: z.string().min(2, "AISHE code is required"),
  institutionType: z.string().min(1, "Select institution type"),
  address: z.string().min(5, "Address is required"),
  phone: z
    .string()
    .length(10, "Phone must be exactly 10 digits"),
  stamp: z
    .any()
    .refine((f) => f?.length === 1, "Upload only one file"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// ----------------- COMPONENT -----------------
export default function AdminForm() {
  const [stampName, setStampName] = useState("");
  const { adminForm, isPending } = useAdminForm();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const accepted = watch("termsAccepted");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("collegeName", data.collegeName);
    formData.append("collegeCode", data.collegeCode);
    formData.append("AISHEcode", data.aisheCode);
    formData.append("InstitutionType", data.institutionType);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phone);
    formData.append("imageFile", data.stamp[0]);
    formData.append("TermnsAndConditions", data.termsAccepted);

    try {
      const response = await adminForm(formData);
      toast.success("college registration successful, you will be inform on your email");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.message);
      navigate('/')
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-gray-200"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#2C3E50]">Register a College</h1>
          <p className="text-gray-600 mt-2">
            IQAC Admin — Add a verified institution to the system.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* College Name */}
          <div>
            <label className="font-medium">College Name</label>
            <input
              {...register("collegeName")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            />
            {errors.collegeName && (
              <p className="text-red-600 text-sm mt-1">{errors.collegeName.message}</p>
            )}
          </div>

          {/* College Code */}
          <div>
            <label className="font-medium">College Code</label>
            <input
              {...register("collegeCode")}
              placeholder="CLG-2025-OD"
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl uppercase focus:ring-2 focus:ring-green-600 outline-none"
            />
            {errors.collegeCode && (
              <p className="text-red-600 text-sm mt-1">{errors.collegeCode.message}</p>
            )}
          </div>

          {/* AISHE Code */}
          <div>
            <label className="font-medium">AISHE Code</label>
            <input
              {...register("aisheCode")}
              placeholder="U-1234"
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            />
            {errors.aisheCode && (
              <p className="text-red-600 text-sm mt-1">{errors.aisheCode.message}</p>
            )}
          </div>

          {/* Institution Type */}
          <div>
            <label className="font-medium">Institution Type</label>
            <select
              {...register("institutionType")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-green-600 outline-none"
            >
              <option value="">Select Type</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Autonomous">Autonomous</option>
              <option value="Deemed">Deemed University</option>
            </select>
            {errors.institutionType && (
              <p className="text-red-600 text-sm mt-1">{errors.institutionType.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium">College Phone Number</label>
            <input
              {...register("phone")}
              placeholder="10-digit number"
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Stamp Upload */}
          <div>
            <label className="font-medium">College Stamp (JPEG Only)</label>
            <input
              {...register("stamp")}
              type="file"
              onChange={(e) => setStampName(e.target.files[0]?.name || "")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white cursor-pointer focus:ring-2 focus:ring-green-600 outline-none"
            />
            {stampName && (
              <p className="text-gray-700 text-sm mt-1">Selected: {stampName}</p>
            )}
            {errors.stamp && (
              <p className="text-red-600 text-sm mt-1">{errors.stamp.message}</p>
            )}
          </div>

          {/* Full Address */}
          <div className="md:col-span-2">
            <label className="font-medium">Address</label>
            <textarea
              {...register("address")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl h-28 focus:ring-2 focus:ring-green-600 outline-none"
            ></textarea>
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" {...register("termsAccepted")} />
          <label className="text-sm">
            I agree to the{" "}
            <a href="/terms" className="text-blue-700 underline">
              Terms & Conditions
            </a>
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-600 text-sm mt-1">{errors.termsAccepted.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!accepted || isPending}
          className={`mt-10 w-full py-4 text-lg font-semibold rounded-xl transition-all shadow-md 
            ${
              accepted
                ? "bg-[#6C8F5E] text-white hover:bg-green-600"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          {isPending ? "Submitting..." : "Register College"}
        </button>
      </form>
    </div>
  );
}
