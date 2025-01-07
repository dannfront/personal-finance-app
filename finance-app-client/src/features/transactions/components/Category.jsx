import { useState } from "react"
import MenuCategory from "./MenuCategory"


function Category({ category, setCategory }) {
    const [openCategory, setOpenCategory] = useState(false)
    return (
        <div className="w-[30px] md:flex md:items-center md:gap-2 md:w-auto" >
            <span className="hidden text-Grey-500 md:text-sm md:block">Category</span>

            <button className="relative md:flex md:justify-evenly md:gap-3 md:items-center md:border md:border-Beige-500 md:rounded-lg md:h-[45px] md:p-2" onClick={() => setOpenCategory(!openCategory)}>
                <span className="hidden  md:block">All Transactions</span>
                <img className="hidden md:block" src="images/icon-caret-down.svg" alt="down" />
                <img className="md:hidden" src="images/icon-filter-mobile.svg" alt="icon-filter" />

                {openCategory && <MenuCategory category={category} setCategory={setCategory} />}
            </button>


        </div>
    )
}

export default Category
