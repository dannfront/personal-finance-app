import { useState } from "react"
import ListCategory from "./ListCategory"
import BtnSelect from "./BtnSelect"

function SelectCategory({ category, setCategory }) {
    const [isOpen, setIsOpen] = useState(false)
    function handleIsOpen() {
        setIsOpen(!isOpen)
    }
    return (
        <div className="relative">
            <BtnSelect onClick={handleIsOpen}>
                <span>{category}</span>
                <img src="src/assets/images/icon-caret-down.svg" alt="caret-down" />
            </BtnSelect>
            {isOpen && <ListCategory setSelectCategory={setCategory} />}
        </div>
    )
}

export default SelectCategory
