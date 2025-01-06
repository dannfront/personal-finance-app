import { useState } from "react";
import HeaderPage from "../../components/HeaderPage";
import Search from "../../components/Search";
import useGetUserData from "../../hooks/useGetUserData"
import Sort from "../transactions/components/Sort";
import { numberFormat } from "../../utils/functions";

function RecurringBills() {
    const { data: { user } } = useGetUserData()
    const [searchByName, setSearchByName] = useState("")
    const [sort, setSort] = useState("")

    const test = user.transactions.filter(transaction => transaction.recurring).reduce((acc, transaction) => {
        if (!acc[transaction.name]) {
            acc[transaction.name] = transaction;
        }
        return acc;
    }, {});
    const transactions = Object.values(test)
    const paidRecurringTransactionsAugust2024 = transactions
        .filter(transaction =>
            new Date(transaction.date).getMonth() + 1 === 8
        ).reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalBills = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const filterTransaction = transactionsFilter({ transactions, searchByName, sort })

    function transactionsFilter(options) {

        const { transactions, searchByName, sort, page, limit } = options


        let filterTransaction = transactions


        if (searchByName) {
            filterTransaction = transactions.filter(transaction => transaction.name.toLowerCase().includes(searchByName))
        }

        if (sort) {
            filterTransaction = filterTransaction.toSorted((a, b) => {
                switch (sort) {
                    case "latest":
                        return new Date(a.date) - new Date(b.date)

                    case "oldest":
                        return new Date(b.date) - new Date(a.date)
                    case "a-to-z":
                        return a.name.localeCompare(b.name)
                    case "z-to-a":
                        return b.name.localeCompare(a.name)
                    case "highest":
                        return b.amount - a.amount
                    case "lowest":
                        return a.amount - b.amount
                    default:
                        return transactions
                }
            })
        }

        return filterTransaction
    }

    return (
        <>
            <HeaderPage title="Recurring Billis" />

            <main className="h-dvh lg:grid lg:grid-cols-[300px_1fr] lg:gap-2">
                <section className=" lg:w-[300px]">
                    <div className="flex flex-col gap-5 md:flex-row md:justify-between lg:flex-col">
                        <article className="bg-Grey-900 rounded-lg p-5 md:w-[332px] lg:w-[300px]">
                            <div className="flex items-center gap-10 md:flex-col md:gap-5 md:items-start">
                                <figure className="w-[40px] md:mt-5">
                                    <img src="src/assets/images/icon-recurring-bills.svg" alt="icon-recurring-bills" />
                                </figure>
                                <div>
                                    <h2 className="text-white text-sm">Total Bills</h2>
                                    <p className="text-white font-bold text-2xl">{numberFormat(Math.abs(totalBills))}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="mt-5 lg:w-full lg:mt-0">
                    <article className="bg-white rounded-lg p-5 lg:w-full">
                        <header className="flex justify-between">
                            <Search placeholder="Search bills" setSearchByName={setSearchByName} />
                            <Sort sort={sort} setSort={setSort} />
                        </header>

                        <ul className="mt-5 divide-y divide-Grey-100">
                            {
                                filterTransaction.map(transaction => {
                                    const image = transaction.avatar.split("/").slice(2).join("/")

                                    return <li key={transaction._id} className="h-fit flex items-center justify-between p-3" >
                                        <div className="flex items-center gap-2">

                                            <figure className="size-[32px]">
                                                <img className="rounded-full" src={`http://localhost:3000/static/${image}`} alt="avatar" />
                                            </figure>
                                            <h3>{transaction.name}</h3>
                                        </div>

                                        <p>{numberFormat(transaction.amount)}</p>

                                    </li>
                                })
                            }

                        </ul>
                    </article>

                </section>
            </main >
        </>
    )
}

export default RecurringBills
