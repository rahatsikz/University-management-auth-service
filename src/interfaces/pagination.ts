export type IPaginationOption = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type IAcademicSemesterFilters = {
  searchTerm?: string
}
