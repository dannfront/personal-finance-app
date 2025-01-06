interface Options {
    category: string,
    maximum: number,
    theme?: string
}

export class BudgetDto {
    private constructor(
        private readonly category: string,
        private readonly maximum: number,
        private readonly theme?: string,
    ) { }

    static create(options: Options): [string?, BudgetDto?] {
        const { category, maximum, theme } = options

        if (!category) return ["category is required",]
        if (!maximum) return ["maximum is required",]
        if (maximum <= 0) return ["the maximum amount must be greater than 0",]


        return [, new BudgetDto(category, maximum, theme)]
    }
}