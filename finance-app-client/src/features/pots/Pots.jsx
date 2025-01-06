import { Suspense, useState } from "react"
import HeaderPage from "../../components/HeaderPage"
import ModalPortal from "../../components/ModalPortal"
import ListPots from "./components/ListPots"
import AddNewPot from "./components/AddPot"
import useGetUserData from "../../hooks/useGetUserData"

function Pots() {


    const { data: { user: financeLocalStorage } } = useGetUserData()
    const [isOpenModal, setIsOpenModal] = useState(false)
    // const [financeLocalStorage, setFinanceLocalStorage] = useLocalStorage("data-finance", data)

    function handlerOpenModal() {
        setIsOpenModal(!isOpenModal)
    }

    const pots = financeLocalStorage.pots

    return (
        <Suspense fallback={<div>Loading...</div>}>

            <>
                <HeaderPage title="Pots" childrenButton="+ Add new Pot" onClick={handlerOpenModal} isRenderButton />

                <main>
                    <article>

                        <ListPots pots={pots} />

                    </article>
                </main>

                {isOpenModal &&
                    <ModalPortal keyModal="modal-pot" handleCloseModal={handlerOpenModal}>
                        <AddNewPot handleCloseModal={handlerOpenModal} current={financeLocalStorage.balance.current} />
                    </ModalPortal>
                }
            </>
        </Suspense>
    )
}

export default Pots
