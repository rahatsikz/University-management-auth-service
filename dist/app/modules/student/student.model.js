'use strict'
/* id  [ Generated ID, same as user id ]
name
fisrtName
middleName
lastName
Gender → enum → male || female
dateOfBirth 24-04-1998
email
contactNo
emergencyContactNo
presentAddress
permanentAddress
bloodGroup → enum →
 guardian
fatherName
fatherOccupation
fatherContactNo
motherName
motherOccupation
motherContactNo
address

localGuardian
name
occupation
contactNo
address
academicSemester [ Reference]
academicDepartment [Reference]
academicFaculty [Reference]
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Student = exports.studentSchema = void 0
const mongoose_1 = require('mongoose')
const student_constant_1 = require('./student.constant')
exports.studentSchema = new mongoose_1.Schema(
  {
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
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
      enums: student_constant_1.Gender,
    },
    bloodGroup: {
      type: String,
      enum: student_constant_1.BloodGroup,
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
    guardian: {
      fatherName: {
        type: String,
        required: true,
      },
      fatherOccupation: {
        type: String,
        required: true,
      },
      fatherContactNo: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      motherOccupation: {
        type: String,
        required: true,
      },
      motherContactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    localGuardian: {
      name: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    profileImage: {
      type: String,
      //   required: true,
    },
    academicFaculty: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicSemester: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
exports.Student = (0, mongoose_1.model)('Student', exports.studentSchema)
