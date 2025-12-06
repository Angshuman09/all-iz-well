import { Admin } from "../models/Admin.model.js";
import { College } from "../models/College.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadImage = async (file) => {
  try {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString('base64');
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'college_stamps',
      resource_type: 'auto'
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Image upload failed');
  }
};

// Admin Form Controller
export const adminFormController = async (req, res) => {
  try {
    const {
      collegeName,
      collegeCode,
      AISHEcode,
      InstitutionType,
      address,
      phoneNumber,
      TermnsAndConditions
    } = req.body;

    // Validate required fields
    if (!collegeName || !collegeCode || !AISHEcode || !phoneNumber || !InstitutionType || !address) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      });
    }

    // Validate phone number
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        error: "Phone number is not valid. Must be a 10-digit Indian number"
      });
    }

    // Check if image was uploaded (field name: imageFile)
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Image file is required"
      });
    }

    // Validate file type (optional but recommended)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        error: "Only JPG, JPEG, PNG, and WEBP images are allowed"
      });
    }

    // Upload image to Cloudinary
    const collegeStampUrl = await uploadImage(req.file);

    // Check if college already exists
    const existingCollege = await College.findOne({
      $or: [
        { name: collegeName },
        { AISHEcode: AISHEcode },
        { collegeCode: collegeCode }
      ]
    });

    if (existingCollege) {
      return res.status(409).json({
        success: false,
        error: "College with this name, AISHE code, or college code already exists"
      });
    }

    // Create new college
    const college = new College({
      name: collegeName,
      AISHEcode,
      collegeCode,
      InstitutionType,
      address
    });

    await college.save();

    // Check if admin with this phone number already exists
    const existingAdmin = await Admin.findOne({ phoneNumber });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        error: "Admin with this phone number already exists"
      });
    }

    // Create new admin
    const admin = new Admin({
      userId: req.userId,
      phoneNumber,
      collegeName: college._id, // Reference to college
      collegeStamps: collegeStampUrl, // Store the uploaded image URL
      TermnsAndConditions
    });

    await admin.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Admin and college registered successfully",
      data: {
        college: {
          id: college._id,
          name: college.name,
          AISHEcode: college.AISHEcode,
          collegeCode: college.collegeCode
        },
        admin: {
          id: admin._id,
          phoneNumber: admin.phoneNumber,
          collegeStamp: admin.collegeStamps
        }
      }
    });

  } catch (error) {
    console.error("Error in admin form controller:", error);

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Duplicate entry found. College or admin already exists.'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error in admin form controller',
      details: error.message
    });
  }
};
