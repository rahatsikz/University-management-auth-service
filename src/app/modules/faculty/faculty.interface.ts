/* 

Faculty:

id (custom generated  by generateFacultyId)
name
firstName
midleName
lastName
gender ('male'|'female')
dateOfBirth 
email
contactNo
emergencyContactNo
presentAddress
permanentAddress
bloodGroup ( 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-')
designation (Professor, Lecturer)
academicDepartment (Department of Computer Science  & Engineering) [reference]
academicFacid ty ( Faculty of Science  and Engineering ) [reference]
 */

import { Model, Types } from 'mongoose'

type Name = {
  firstName: string
  midleName?: string
  lastName: string
}

export type IFaculty = {
  id: string
  name: Name
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  designation: string
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>
export type IFacultyFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  bloodGroup?: string
}
