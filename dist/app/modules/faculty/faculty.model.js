'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Faculty = void 0
const mongoose_1 = require('mongoose')
const faculty_constant_1 = require('./faculty.constant')
const facultySchema = new mongoose_1.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: String,
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    enum: faculty_constant_1.Gender,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: faculty_constant_1.BloodGroup,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  academicDepartment: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  academicFaculty: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
})
exports.Faculty = (0, mongoose_1.model)('Faculty', facultySchema)
