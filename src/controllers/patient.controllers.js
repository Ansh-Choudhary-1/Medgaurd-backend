import { Patient } from "../models/patient.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    // Check if patient already exists
    const ifExist = await Patient.findOne({ name });
    if (ifExist) {
      return res.status(409).json({ message: "Patient already exists" });
    }

    // Create and save new patient
    const patient = new Patient({ name, age, gender });
    await patient.save();

    return res.status(201).json({ message: "Patient Created", patient });
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const fetchPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const addLab = async (req, res) => {
  try {
    const { id, viewPosition } = req.body;

    // Check if file exists
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Please upload an X-ray file" });
    }

    const avatarLocalPath = req.file.path;
    console.log("Uploaded file path:", avatarLocalPath); // Debugging log

    // Upload file to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      return res.status(500).json({ message: "Error uploading to Cloudinary" });
    }

    // Update patient record with X-ray details
    const user = await Patient.findByIdAndUpdate(
      id,
      {
        $set: {
          xray: avatar.url,
          viewPosition: viewPosition,
        },
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({ message: "X-ray updated successfully", user });
  } catch (error) {
    console.error("Error in addLab:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
