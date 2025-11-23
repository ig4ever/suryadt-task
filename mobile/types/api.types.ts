export interface Owner {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  description?: string;
  favorites: boolean;
  isMaster: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pet {
  _id?: string;
  masterId: string;
  categoryId: string;
  name: string;
  dob: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
}
