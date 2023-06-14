import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'

type Name = {
  firstName: string
  middleName?: string
  lastName: string
}
type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type IStudent = {
  id: string
  name: Name
  gender: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage?: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicSemester: Types.ObjectId | IAcademicSemester
}

export type IStudentFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  bloodGroup?: string
}

export type StudentModel = Model<IStudent, Record<string, unknown>>
