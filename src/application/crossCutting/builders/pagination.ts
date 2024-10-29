import { PaginationOptions } from "../../../domain/seed/repository";

const pagination = (page: number, size: number): PaginationOptions => {
    return {
        offset: (page - 1) * size,
        take: size,
    }
};

export default pagination;