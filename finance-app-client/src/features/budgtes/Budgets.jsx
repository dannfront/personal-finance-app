
import { data as dataApp } from "../../../data";
import BudgetItemList from "./BudgetItemList";
import { Suspense, useState } from "react";
import ModalPortal from "../../components/ModalPortal";
import AddNewBudget from "./components/AddNewBudget";
import Graphic from "./components/Graphic";
import HeaderPage from "../../components/HeaderPage";
import useGetUserData from "../../hooks/useGetUserData";


function Budgets() {
    const { data: { user } } = useGetUserData()


    const [isOpenModal, setIsOpenModal] = useState(false)
    const [openMenuID, setOpenMenuID] = useState(null)

    const budgets = user.budgets
    const transactions = user.transactions

    function hanndlerOpenModal() {

        setIsOpenModal(!isOpenModal)
    }

    return (
        <Suspense fallback={<div>loading</div>}>

            <HeaderPage title="Budgets" childrenButton="+ Add new Budget" onClick={hanndlerOpenModal} isRenderButton />

            <main className="grid-budgets" >

                <section className="bg-white rounded-lg flex flex-col gap-10 p-8 md:flex-row md:items-center  md:gap-20 lg:flex-col lg:px-5  lg:gap-5 lg:h-fit lg:w-[428px]">
                    <div className="w-[250px] mx-auto md:mx-0 lg:mx-auto lg:gap-5">

                        <Graphic budgets={budgets} transactions={transactions} />


                    </div>

                    <article className="w-full">
                        <h2 className="font-bold text-xl mb-5">Spending Summary</h2>

                        <ul className="divide-y-[1px] divide-gray-100 ">
                            {
                                budgets.map(budget => {
                                    const test = dataApp.transactions.filter(transaction => transaction.category === budget.category)

                                    const spent = Math.abs(test.reduce((accumulator, amount) => accumulator + amount.amount, 0))

                                    return <li className="py-5" key={budget.category}>

                                        <div className="flex justify-between items-center">

                                            <div className="flex gap-2 items-center">
                                                <div className="w-1 h-5 rounded-md" style={{ backgroundColor: budget.theme }}></div>
                                                <p className="text-gray-500">{budget.category}</p>
                                            </div>
                                            <p className="font-bold text-gray-900">${spent} <span className="text-gray-500 font-normal">of ${budget.maximum}</span></p>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>


                    </article>
                </section >

                <article>
                    {
                        budgets.map((budget, i) => {
                            return < BudgetItemList openMenuID={openMenuID} setOpenMenuID={setOpenMenuID} id={budget._id} budget={budget} data={dataApp.transactions} key={i} />
                        })
                    }
                </article>
            </main>

            {isOpenModal &&
                <ModalPortal handleCloseModal={hanndlerOpenModal} keyModal="modal" >

                    <AddNewBudget handleCloseModal={hanndlerOpenModal} />

                </ModalPortal>
            }

        </Suspense>
    )
}

export default Budgets
