export const projectionIncome = [
    {
        $match: {
            amount: { $gt: 0 }
        }
    },
    {
        $group: {
            _id: null,
            income: { $sum: "$amount" }
        }
    }
]

export const projectionExpenses = [
    {
        $match: {
            amount: {
                $lt: 0
            }
        }
    },
    {
        $project: {
            expenses: {
                $abs: "$amount"
            }
        }
    },
    {
        $group: {
            _id: null,
            expenses: {
                $sum: "$expenses"
            }
        }
    }
]
