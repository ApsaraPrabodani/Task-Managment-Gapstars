export interface TaskDTO {
    title: string,
    status: string,
    priority: string
}

export interface TaskFilters {
    page: number,
    per_page: number,
    priority: string,
    status: string,
    sort_by?: string,
    sort_order?: string
}