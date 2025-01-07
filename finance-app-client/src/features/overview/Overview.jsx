import HeaderPage from "../../components/HeaderPage";
import Statistics from "./components/Statistics";
import PotsStatistics from "./components/PotsStatistics";
import useGetUserData from "../../hooks/useGetUserData";
import TransactionsStatistics from "./components/TransactionsStatistics";
import BudgetsStatistics from "./components/BudgetsStatistics";
import RecurringBills from "./components/RecurringBills";

function Overview() {

    const { data: { user: data } } = useGetUserData()

    const budgets = data.budgets
    const transactions = data.transactions
    const pots = data.pots.slice(0, 4)
    const allPots = data.pots
    const balance = data.balance



    return (
        <>
            <HeaderPage title="OverView" />

            <main>
                <Statistics balance={balance} />
                <div className="lg:grid lg:grid-cols-2 lg:gap-5">
                    <div>

                        <PotsStatistics pots={pots} allPots={allPots} />

                        <TransactionsStatistics transactions={data.transactions.slice(0, 5)} />
                    </div>

                    <div>
                        <BudgetsStatistics budgets={budgets} transactions={transactions} />
                        <RecurringBills transactions={transactions} />
                    </div>

                </div>

            </main>
        </>
    )
}

export default Overview
