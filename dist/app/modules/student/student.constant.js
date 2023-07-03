"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentFilterableFields = exports.studentSearchableFields = exports.Gender = exports.BloodGroup = void 0;
exports.BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.Gender = ['male', 'female'];
exports.studentSearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
exports.studentFilterableFields = [
    'searchTerm',
    'id',
    'email',
    'contactNo',
    'emergencyContactNo',
    'bloodGroup',
];
