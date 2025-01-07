import BudgetTransactionItemList from "./BudgetTransactionItemList"
import Button from "../../../components/Button"
import { useState } from "react"
import ModalPortal from "../../../components/ModalPortal"
import AddNewBudget from "./AddNewBudget"
import DeleteModal from "../../../components/DeleteModal"
import LinkSee from "../../../components/LInkSee"

function BudgetItemList({ budget, data, openMenuID, setOpenMenuID, id }) {

    const { theme, maximum, category } = budget

    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const transactionsCategory = data.filter(transaction => transaction.category === category)
    const spent = Math.abs(transactionsCategory.reduce((accumulator, amount) => accumulator + amount.amount, 0))
    const free = maximum - spent
    const getThreeTransactions = transactionsCategory.slice(0, 3)

    function closeAndOpenMenu(id) {
        if (openMenuID === id) return setOpenMenuID(null)

        setOpenMenuID(id)
    }

    return (
        <>
            <section className="bg-white rounded-lg p-5 mb-5">
                <div className="relative flex items-center justify-between">

                    <div className="flex gap-5 items-center">
                        <div className=" rounded-full w-4 h-4" style={{ backgroundColor: theme }}></div>
                        <h2 className="font-bold text-xl">{category}</h2>
                    </div>

                    <Button onClick={() => closeAndOpenMenu(id)}>
                        <img src="src/assets/images/icon-ellipsis.svg" alt="elipsis" />
                    </Button>

                    {(id === openMenuID) && <div className="absolute top-6 right-0 bg-white rounded-lg shadow-[0px_10px_18px_0px_rgba(0,_0,_0,_0.1)] p-5 md:p-2">
                        <Button className="block md:text-sm" onClick={() => setOpenEdit(true)}>
                            Edit Budget
                        </Button>

                        <Button className="text-red-500 block md:text-sm" onClick={() => setOpenDelete(true)}>
                            Delete Budget
                        </Button>
                    </div>}
                </div>
                <span className="text-gray-500">Maximun of ${maximum}</span>
                <div className="w-full h-10 border rounded-2xl bg-Beige-100 p-1 border-Beige-100" >
                    <div className="progress" style={{ width: `${(spent / maximum) * 100 >= 100 ? 100 : (spent / maximum) * 100}%`, backgroundColor: theme }}></div>
                </div>
                <dl className="flex items-center gap-5 mt-5">

                    <div className="w-1 rounded-full h-10" style={{ backgroundColor: theme }}></div>
                    <div className="flex gap-[5rem] w-full">

                        <div >

                            <dt className="text-gray-500">spent</dt>
                            <dd className="font-bold">${spent}</dd>

                        </div>
                        <div>
                            <dt className="text-gray-500" >Free</dt>
                            <dd className={`font-bold ${free < 0 ? "text-red-500" : "text-gray-900"}`} >${Math.round(maximum - spent)}</dd>
                        </div>
                    </div>
                </dl>
                <div className="bg-Beige-100 rounded-lg mt-5 p-3">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">Latest Spending</h3>

                        <LinkSee textButton="See All" to="/transactions" />
                    </div>
                    <ul className="mt-5 divide-y-[1px] divide-Grey-300">
                        {
                            getThreeTransactions.map((transaction, i) => <BudgetTransactionItemList transactions={transaction} key={i} />)
                        }
                    </ul>
                </div>
            </section>

            {openDelete &&

                <ModalPortal keyModal="modal-delete" handleCloseModal={() => setOpenDelete(false)}>
                    <DeleteModal handleClose={() => setOpenDelete(false)} category={category} id={id} />
                </ModalPortal>

            }
            {
                openEdit &&
                <ModalPortal keyModal="modal-edit" handleCloseModal={() => setOpenEdit(false)} >
                    <AddNewBudget handleCloseModal={() => setOpenEdit(false)} data={budget} id={id} type="edit" />
                </ModalPortal>
            }
        </>
    )
}

export default BudgetItemList
