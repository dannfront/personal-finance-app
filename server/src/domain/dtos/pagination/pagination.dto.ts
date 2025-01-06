
interface Pagination {
    page?: number
    limit?: number
}

export class PaginationDto {
    private constructor(
        readonly page?: number,
        readonly limit?: number,
    ) { }

    static create(body: Pagination): [string?, PaginationDto?] {

        const { page, limit } = body



        if (page === undefined && limit === undefined) return [, new PaginationDto(undefined, undefined)]

        if (page !== undefined) {
            if (isNaN(page) || page < 0) {
                return ["page must be greater than 0",]
            }
        }

        if (limit !== undefined) {
            if (isNaN(limit) || limit < 0) {

                return ["limit must be greater than 0",]
            }
        }

        return [, new PaginationDto(page, limit)]
    }
}