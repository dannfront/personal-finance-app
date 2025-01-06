import { useState } from "react"
import MenuSort from "./MenuSort"


function Sort({ sort, setSort }) {
    const [openSort, setOpenSort] = useState(false)
    return (
        <div className="w-[24px] md:flex md:items-center md:gap-2 md:w-auto">
            <span className="hidden text-Grey-500 md:text-sm md:block">Sort by</span>
            <button className="relative w-[24px] md:flex md:justify-evenly md:items-center md:border md:border-Beige-500 md:rounded-lg md:w-[113px] md:h-[45px]" onClick={() => setOpenSort(!openSort)}>
                <span className="hidden md:block">Latest</span>
                <img className="hidden md:block" src="src/assets/images/icon-caret-down.svg" alt="down" />
                <img className="md:hidden" src="src/assets/images/icon-sort-mobile.svg" alt="icon-sort" />

                {openSort && < MenuSort sort={sort} setSort={setSort} />}
            </button>
        </div>
    )
}

export default Sort
