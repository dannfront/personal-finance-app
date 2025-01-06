import CategoryBar from "../../../components/CategoryBar"
import LinkSee from "../../../components/LInkSee"
import Graphic from "../../budgtes/components/Graphic"

function BudgetsStatistics({ budgets, transactions }) {

    return (
        <section className="bg-white rounded-lg mt-5 p-5">
            <header className="flex justify-between items-center">
                <h2 className="font-bold text-xl">Budgets</h2>
                <LinkSee textButton="See Details" to="/budgets" />
            </header>

            <div className="md:flex">
                <article className="mx-auto w-[250px]">
                    <Graphic budgets={budgets} transactions={transactions} />
                </article>

                <article className="flex flex-wrap gap-5 mt-5 md:w-[200px] md:justify-center md:flex-col lg:w-[150px]">
                    {budgets.map((budget, i) => <CategoryBar key={i} theme={budget.theme} title={budget.category} amount={budget.maximum} />)}
                </article>
            </div>
        </section>
    )
}

export default BudgetsStatistics
