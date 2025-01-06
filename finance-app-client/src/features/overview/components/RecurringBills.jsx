import LinkSee from "../../../components/LInkSee"
import { numberFormat } from "../../../utils/functions";

function RecurringBills({ transactions }) {
    const transactionsRecurrings = transactions.filter(transaction => transaction.recurring).reduce((acc, transaction) => {
        if (!acc[transaction.name]) {
            acc[transaction.name] = transaction;
        }
        return acc;
    }, {});
    const transactionsRecuringBills = Object.values(transactionsRecurrings)
    const paidRecurringTransactionsAugust2024 = transactions
        .filter(transaction =>
            new Date(transaction.date).getMonth() + 1 === 8
        ).reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalBills = transactionsRecuringBills.reduce((acc, transaction) => acc + transaction.amount, 0);

    return (
        <section className="w-full bg-white rounded-lg mt-5 p-5">
            <header className="flex justify-between items-center">
                <h2 className="font-bold text-xl">Recurring Bills</h2>
                <LinkSee textButton="See Details" to="/recurring-bills" />
            </header>
            <ul className="space-y-4">
                <li className="bg-Beige-100 border border-l-Green border-l-4  rounded-lg flex justify-between p-3">
                    <p>Paid Bills</p>
                    <p>{numberFormat(Math.abs(paidRecurringTransactionsAugust2024))}</p>
                </li>
                <li className="bg-Beige-100 border border-l-gray-900 border-l-4  rounded-lg flex justify-between p-3">
                    <p>Total Bills</p>
                    <p>{numberFormat(Math.abs(totalBills))}</p>
                </li>

            </ul>
        </section>
    )
}

export default RecurringBills
