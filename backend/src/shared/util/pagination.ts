import { PaginationDto } from '../dtos/pagination.dto.js';

export interface IPaginationParams {
  page: number;
  rowsPerPage: number;
}

export function parsePaginationParams(params: unknown): IPaginationParams {
  return PaginationDto.parse(params);
}
