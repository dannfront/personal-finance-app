interface Amount {
    amount: number
    target: number
}

export class AddandWithdrawDto {
    constructor(
        readonly amount: number
    ) { }

    static create(body: Amount): [string?, AddandWithdrawDto?] {
        const { amount, target } = body

        if (!amount) return ["amount is required",]
        if (typeof amount !== "number") return ["amount must be a number",]
        if (amount > target) return ["amount must be less than target",]
        if (amount < 0) return ["amount must be greater than 0",]

        return [undefined, new AddandWithdrawDto(amount)]
    }
}
