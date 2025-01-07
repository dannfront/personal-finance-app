import { Suspense, useCallback, useEffect, useState } from "react";
import TitlePage from "../../components/TitlePage"
import ItemTransactions from "./components/ItemTransactions";
import PageNumber from "./components/PageNumber";
import Button from "../../components/Button";
import Category from "./components/Category";
import Sort from "./components/Sort";
import useGetUserData from "../../hooks/useGetUserData";
import Search from "../../components/Search";



function Transactions() {
    const { data } = useGetUserData()
    const financeLocalStorage = data.user

    const [nextPage, setNextPage] = useState(1)
    const [searchByName, setSearchByName] = useState("")
    const [sort, setSort] = useState("")
    const [category, setCategory] = useState("")


    const limit = 10 * nextPage
    const page = (nextPage - 1) * 10

    const itemsTransactions = transactionsFilter({ financeLocalStorage, searchByName, category, sort, page, limit })


    // const totalPages = sort !== "" || category !== "" || searchByName !== "" ? itemsTransactions.length : financeLocalStorage.transactions.length
    let totalPages = financeLocalStorage.transactions.length

    if (sort) {
        totalPages = financeLocalStorage.transactions.length
    }

    if (category !== "" || searchByName !== "") {
        totalPages = itemsTransactions.length
    }
    const handdlerNextPage = useCallback(() => {
        setNextPage(nextPage => nextPage + 1)
    }, [])

    const handdlerPrevPage = useCallback(() => {
        setNextPage(prevPage => prevPage - 1)
    }, [])

    function transactionsFilter(options) {

        const { financeLocalStorage, searchByName, category, sort, page, limit } = options


        let filterTransaction = financeLocalStorage.transactions

        if (searchByName) {
            filterTransaction = financeLocalStorage.transactions.filter(transaction => transaction.name.toLowerCase().includes(searchByName)).slice(page, limit)
        }

        if (category && category !== "") {
            filterTransaction = filterTransaction.filter(transaction => transaction.category === category)
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
                        return financeLocalStorage.transactions
                }
            })
        }
        return filterTransaction.slice(page, limit)
    }

    useEffect(() => {
        if (!itemsTransactions.length) {
            setNextPage(1)
        }
    }, [nextPage, itemsTransactions])


    return (
        <Suspense fallback={<div>loading</div>}>
            <TitlePage>
                Transactions
            </TitlePage>

            <main className="bg-white rounded-xl p-5 ">

                <section className="flex justify-between mb-5">

                    <Search placeholder="Search transaction" setSearchByName={setSearchByName} />

                    <div className="flex gap-16 md:gap-5">
                        <Sort sort={sort} setSort={setSort} />
                        <Category category={category} setCategory={setCategory} />
                    </div>

                </section>

                <article className=" h-full md:h-[700px] md:overflow-auto md:overflow-y-scroll lg:h-[360px]">
                    <ul className="divide-y-[1.5px] space-y-5 divide-Grey-100">
                        {itemsTransactions.map((transaction, i) => (
                            <ItemTransactions transaction={transaction} key={i} />
                        ))}
                    </ul>

                </article>

                <section className="mt-5 flex justify-between">

                    <Button className="border border-Beige-500 w-[50px] rounded-xl p-3 flex justify-center transition-colors hover:bg-Beige-500" onClick={handdlerPrevPage}>
                        <img src="s/images/icon-caret-left.svg" alt="icon" />
                    </Button>

                    <PageNumber arrayLength={totalPages} pageNumber={nextPage} />

                    <Button className="border border-Beige-500 w-[50px] rounded-xl p-3 flex justify-center hover:bg-Beige-500" onClick={handdlerNextPage}>
                        <img src="images/icon-caret-right.svg" alt="icon" />
                    </Button>
                </section>
            </main>
        </Suspense>
    )
}

export default Transactions
