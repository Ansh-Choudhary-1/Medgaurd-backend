import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    xray: {
      type: String,
    },
    viewPosition: {
      type: String,
    },
    psv: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);

