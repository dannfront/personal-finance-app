interface Options {
    category?: string,
    maximum?: number,
    theme?: string
}

export class UpdateBudgetDto {
    constructor(
        private readonly category?: string,
        private readonly maximum?: number,
        private readonly theme?: string,
    ) { }

    static create(options: Options): [string?, UpdateBudgetDto?] {

        const { category, maximum, theme } = options

        if (!category && !maximum && !theme) return ["some property must come to update",]

        if (maximum && maximum <= 0) return ["the maximum amount must be greater than 0",]

        return [, new UpdateBudgetDto(category, maximum, theme)]
    }
}