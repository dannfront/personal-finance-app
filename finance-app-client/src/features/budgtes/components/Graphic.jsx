import { Cell, Pie, PieChart } from "recharts"
import { numberFormat } from "../../../utils/functions";

function Graphic({ budgets, transactions }) {

    const data = budgets.map(budgets => ({ name: budgets.category, value: budgets.maximum }))
    const COLORS = budgets.map(budget => budget.theme)
    const totalLimit = budgets.reduce((accumulator, budget) => budget.maximum + accumulator, 0)
    const test = data.map(budget => budget["name"])
    const reduceTest = transactions.filter(transaction => test.includes(transaction.category))
        .reduce((accumulator, transaction) => transaction.amount + accumulator, 0)



    return (
        <div className="relative size-[250px]">

            <PieChart width={250} height={250} className="">
                <Pie
                    data={data}
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entries, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="block font-bold text-3xl">{numberFormat(Math.abs(reduceTest))}</span>
                <span className="text-Grey-500 block">of {numberFormat(totalLimit)} limit</span>

            </div>
        </div>
    )
}

export default Graphic
