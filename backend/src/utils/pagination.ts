import { Query } from "mongoose";
import {
  PaginationParams,
  PaginationResult,
  PaginatedResponse,
} from "../types";

export class Pagination {
  static paginate<T>(
    query: Query<T[], T>,
    { page = 1, limit = 10, maxLimit = 100 }: PaginationParams
  ): PaginationResult & { query: Query<T[], T> } {
    const parsedPage = Math.max(1, parseInt(String(page)));
    const parsedLimit = Math.min(
      Math.max(1, parseInt(String(limit))),
      maxLimit
    );
    const skip = (parsedPage - 1) * parsedLimit;

    return {
      page: parsedPage,
      limit: parsedLimit,
      skip,
      query: query.skip(skip).limit(parsedLimit),
    };
  }

  static createResponse<T>(
    data: T[],
    total: number,
    page: number,
    limit: number
  ): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}
