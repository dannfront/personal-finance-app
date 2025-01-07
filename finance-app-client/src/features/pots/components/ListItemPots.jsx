import { useState } from "react"
import Button from "../../../components/Button"
import { numberFormat } from "../../../utils/functions"
import DeleteModal from "../../../components/DeleteModal"
import ModalPortal from "../../../components/ModalPortal"
import AddNewPot from "./AddPot"
import Withdraw from "./Withdraw"
import AddMoney from "./AddMoney"

function ListItemPots({ pot, id, openModalMenu, setOpenModalMenu }) {

    const { theme, total, target, name } = pot

    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)

    const [openModaWithdraw, setOpenModalWithdraw] = useState(false)
    const [openModalAdd, setOpenModalAdd] = useState(false)

    function closeAndOpenMenu(id) {

        if (id === openModalMenu) return setOpenModalMenu(null)

        setOpenModalMenu(id)
    }

    if (openModaWithdraw) {
        return <ModalPortal keyModal={`modal-withdraw-${id}`} handleCloseModal={() => setOpenModalWithdraw(false)}>
            <Withdraw handleCloseModal={() => setOpenModalWithdraw(false)} id={id} target={target} total={total} theme={theme} />
        </ModalPortal>
    }
    if (openModalAdd) {
        return <ModalPortal keyModal={`modal-add-${id}`} handleCloseModal={() => setOpenModalAdd(false)}>
            <AddMoney handleCloseModal={() => setOpenModalAdd(false)} id={id} target={target} total={total} theme={theme} name={name} />
        </ModalPortal>
    }

    if (openModalDelete) {
        return <ModalPortal keyModal={`modal-delete-${id}`} handleCloseModal={() => setOpenModalDelete(false)}>
            <DeleteModal type="pot" id={id} category={name} handleClose={() => setOpenModalDelete(false)} />
        </ModalPortal>
    }

    if (openModalEdit) {
        return <ModalPortal keyModal={`modal-delete-${id}`} handleCloseModal={() => setOpenModalEdit(false)}>
            <AddNewPot handleCloseModal={() => setOpenModalEdit(false)} type="edit" data={pot} />
        </ModalPortal>
    }

    return (
        <li>
            <section className="bg-white rounded-lg p-5">
                <header className="relative flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="size-4 rounded-full" style={{ backgroundColor: theme }}></div>
                        <h2 className="font-bold text-xl text-gray-900">{name}</h2>
                    </div>
                    <div className="size-5">
                        <Button onClick={() => closeAndOpenMenu(id)} className="size-[100%]">
                            <img src="images/icon-ellipsis.svg" alt="menu" />
                        </Button>
                    </div>
                    {id === openModalMenu && <div className="absolute top-6 right-0 bg-white rounded-lg shadow-[0px_10px_18px_0px_rgba(0,_0,_0,_0.1)] p-5 md:p-2">
                        <Button className="block md:text-sm" onClick={() => setOpenModalEdit(true)}>
                            Edit Budget
                        </Button>

                        <Button className="text-red-500 block md:text-sm" onClick={() => setOpenModalDelete(true)}>
                            Delete Budget
                        </Button>
                    </div>}
                </header>
                <div className="mt-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-gray-500">Total Saved</h3>
                        <h2 className="font-bold text-3xl text-gray-900">{numberFormat(total)}</h2>
                    </div>

                    <section>
                        <div className="w-full h-2 rounded-full bg-Beige-100 my-5">
                            <div className="progress" style={{ width: `${(total / target) * 100}%`, backgroundColor: theme }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-Grey-500 font-bold">{((total / target) * 100).toPrecision(2)}%</p>
                            <p className="text-Grey-500">Target of {numberFormat(target)}</p>
                        </div>
                        <div className="flex gap-5 items-center mt-4 ">
                            <Button onClick={() => setOpenModalAdd(true)} className="bg-Beige-100 w-full p-3 border border-Beige-100 hover:bg-white hover:border-black">+ Add Money</Button>
                            <Button onClick={() => setOpenModalWithdraw(true)} className="bg-Beige-100 w-full p-3 border border-Beige-100 hover:bg-white  hover:border-black">Withdraw</Button>
                        </div>
                    </section>
                </div>

            </section>
        </li>
    )
}

export default ListItemPots
