'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserService = void 0
const user_model_1 = require('./user.model')
const index_1 = __importDefault(require('../../../config/index'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const user_utils_1 = require('./user.utils')
const academicSemester_model_1 = require('../academicSemester/academicSemester.model')
const mongoose_1 = __importDefault(require('mongoose'))
const student_model_1 = require('../student/student.model')
const http_status_1 = __importDefault(require('http-status'))
const faculty_model_1 = require('../faculty/faculty.model')
const createStudent = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
      user.password = index_1.default.default_student_pass
    }
    user.role = 'student'
    const academicSemester =
      yield academicSemester_model_1.AcademicSemester.findById(
        student.academicSemester
      )
    const session = yield mongoose_1.default.startSession()
    let newUserAllData = null
    try {
      session.startTransaction()
      const id = yield (0, user_utils_1.generateStudentID)(academicSemester)
      user.id = id
      student.id = id
      const newStudent = yield student_model_1.Student.create([student], {
        session,
      })
      if (!newStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student'
        )
      }
      user.student = newStudent[0]._id
      const newUser = yield user_model_1.User.create([user], { session })
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        )
      }
      newUserAllData = newUser[0]
      yield session.commitTransaction()
      yield session.endSession()
    } catch (error) {
      yield session.abortTransaction()
      yield session.endSession()
      throw error
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'student',
        populate: [
          {
            path: 'academicSemester',
          },
          {
            path: 'academicFaculty',
          },
          {
            path: 'academicDepartment',
          },
        ],
      })
    }
    return newUserAllData
    // const createdUser = await User.create(user)
    // if (!createdUser) {
    //   throw new ApiError(400, 'Failed to create user')
    // }
    // return createdUser
  })
const createFaculty = (faculty, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
      user.password = index_1.default.default_faculty_pass
    }
    user.role = 'faculty'
    const session = yield mongoose_1.default.startSession()
    let newFacultyAllData = null
    try {
      session.startTransaction()
      const id = yield (0, user_utils_1.generateFacultyID)()
      user.id = id
      faculty.id = id
      const newFaculty = yield faculty_model_1.Faculty.create([faculty], {
        session,
      })
      if (!newFaculty.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create faculty'
        )
      }
      user.faculty = newFaculty[0]._id
      const newUser = yield user_model_1.User.create([user], { session })
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        )
      }
      newFacultyAllData = newUser[0]
      yield session.commitTransaction()
      yield session.endSession()
    } catch (error) {
      yield session.abortTransaction()
      yield session.endSession()
      throw error
    }
    if (newFacultyAllData) {
      newFacultyAllData = yield user_model_1.User.findOne({
        id: newFacultyAllData.id,
      }).populate({
        path: 'faculty',
        populate: [
          {
            path: 'academicFaculty',
          },
          {
            path: 'academicDepartment',
          },
        ],
      })
    }
    return newFacultyAllData
  })
exports.UserService = {
  createStudent,
  createFaculty,
}
