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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.FacultyService = void 0
const paginationHelpers_1 = require('../../../helpers/paginationHelpers')
const faculty_constant_1 = require('./faculty.constant')
const faculty_model_1 = require('./faculty.model')
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const http_status_1 = __importDefault(require('http-status'))
const getAllFaculties = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const { page = 1, limit = 10 } = paginationOptions
    // const skip = (page - 1) * limit
    const { searchTerm } = filters,
      filterData = __rest(filters, ['searchTerm'])
    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: faculty_constant_1.facultySearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      })
    }
    if (Object.keys(filterData).length) {
      andConditions.push({
        $and: Object.entries(filterData).map(([field, value]) => ({
          [field]: value,
        })),
      })
    }
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers_1.paginationHelpers.calculatePagination(
        paginationOptions
      )
    const sortCondition = {}
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder
    }
    const whereConditions = andConditions.length ? { $and: andConditions } : {}
    const result = yield faculty_model_1.Faculty.find(whereConditions)
      .populate([
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ])
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
    const total = yield faculty_model_1.Faculty.countDocuments(whereConditions)
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  })
const getSingleFaculty = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id).populate([
      {
        path: 'academicFaculty',
      },
      {
        path: 'academicDepartment',
      },
    ])
    return result
  })
const deleteFaculty = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findByIdAndDelete(id).populate(
      [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ]
    )
    return result
  })
const updateFaculty = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield faculty_model_1.Faculty.findOne({ id })
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Faculty not found'
      )
    }
    const { name } = payload,
      FacultyData = __rest(payload, ['name'])
    const updateFacultyData = Object.assign({}, FacultyData)
    if (name && Object.keys(name).length) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`
        updateFacultyData[nameKey] = name[key]
      })
    }
    const result = yield faculty_model_1.Faculty.findOneAndUpdate(
      { id },
      updateFacultyData,
      {
        new: true,
      }
    )
    return result
  })
exports.FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
}
