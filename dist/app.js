"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
// import ApiError from './errors/ApiError'
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// route
app.use('/api/v1', routes_1.default);
// app.use('/api/v1/users', UserRoutes)
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
// eslint-disable-next-line no-console
// console.log(app.get('env'))
// test
/* app.get('/', async () => {
  // throw new ApiError(400, 'Error Ashse')
  // next('error ashse')
  // Promise.reject(new Error('Unhandled Promise Rejection'))
  // console.log(x)
  throw new Error('Uncaught exception detected')
}) */
// global error handler
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'API not found',
        errorMessages: [{ Path: req.originalUrl, message: 'API not found' }],
    });
    next();
});
// const academicSemester: IAcademicSemester = {
//   title: 'Summer',
//   year: '2025',
//   code: '02',
//   startMonth: 'April',
//   endMonth: 'July',
// }
// const testID = async (academicSemester: IAcademicSemester) => {
//   const id = await generateStudentID(academicSemester)
//   // console.log(id)
//   return id
// }
// testID(academicSemester)
// const testFacultyID = async () => {
//   const id = await generateFacultyID()
//   return id
// }
// testFacultyID()
exports.default = app;
