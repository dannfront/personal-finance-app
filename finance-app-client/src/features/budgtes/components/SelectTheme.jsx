import { useState } from "react"
import BtnSelect from "./BtnSelect"
import ListThemes from "./ListThemes"

function SelectTheme({ theme, setTheme, setNameTheme }) {
    const [isOpen, setIsOpen] = useState(false)
    function handleIsOpen() {
        setIsOpen(!isOpen)
    }
    return (
        <div className="relative">
            <BtnSelect onClick={handleIsOpen} >
                <span>{theme}</span>
                <img src="src/assets/images/icon-caret-down.svg" alt="caret-down" />
            </BtnSelect>
            {isOpen && <ListThemes setTheme={setTheme} setNameTheme={setNameTheme} />}
        </div>
    )
}

export default SelectTheme
