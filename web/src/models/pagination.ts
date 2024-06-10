
export interface PAGINATE {
    pageNumber: number
    pageSize: number
    sort: {
        field: string,
        direction: string
    }
    totalElements: number
    totalPages: number
}

export const INIT_PAGINATE = {
    pageNumber: 1,
    pageSize: 10,
    sort: {
        field: "updated_date",
        direction: "desc"
    },
    totalElements: 1,
    totalPages: 1
}
