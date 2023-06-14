import { Model, Types } from 'mongoose'

type Name = {
  firstName: string
  middleName?: string
  lastName: string
}

export type IAdmin = {
  id: string
  name: Name
  dateOfBirth: string
  gender: 'male' | 'female'
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  managementDepartment: Types.ObjectId
  designation: string
  profileImage?: string
}

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  bloodGroup?: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>
