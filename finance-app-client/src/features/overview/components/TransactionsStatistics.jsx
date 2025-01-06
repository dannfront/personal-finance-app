import LinkSee from "../../../components/LInkSee"
import ItemTransactions from "../../transactions/components/ItemTransactions"

function TransactionsStatistics({ transactions = [] }) {
    return (
        <section className="bg-white rounded-lg p-5 mt-5">
            <header className="flex justify-between items-center">
                <h2 className="font-bold text-xl">Transactions</h2>
                <LinkSee textButton="View All" to="/transactions" />
            </header>

            <ul className="divide-y-[1.5px] divide-Grey-100">
                {
                    transactions.map(((transaction, i) => <ItemTransactions key={i} transaction={transaction} />))
                }
            </ul>
        </section>
    )
}

export default TransactionsStatistics
