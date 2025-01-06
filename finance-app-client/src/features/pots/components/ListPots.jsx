import { useState } from "react"
import ListItemPots from "./ListItemPots"

function ListPots({ pots }) {

    const [openModalMenu, setOpenModalMenu] = useState(null)

    return (
        <ul className=" grid grid-flow-row gap-5 lg:grid-cols-2  lg:grid-rows-none">
            {
                pots.map((pot, id) => <ListItemPots key={id} pot={pot} id={pot._id} openModalMenu={openModalMenu} setOpenModalMenu={setOpenModalMenu} />)
            }
        </ul>
    )
}

export default ListPots
