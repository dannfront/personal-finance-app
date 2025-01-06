function MenuCategory({ category, setCategory }) {

    function hanndlerCategory(e) {

        const categoryType = e.target.dataset.category
        if (category === categoryType) return setCategory("")


        setCategory(categoryType)
    }

    return (
        <div className="absolute right-[-25px] flex flex-col gap-2 text-sm bg-white rounded-lg shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1)] p-5 divide-y-[1px] divide-Grey-100 w-[130px] md:w-full md:top-12 md:text-base md:right-0">
            <span data-category="" className={`cursor-pointer ${category === "" ? "font-bold" : ""}`} onClick={hanndlerCategory}>All Transactions</span>
            <span data-category="Entertainment" className={`cursor-pointer ${category === "Entertainment" ? "font-bold" : ""}`} onClick={hanndlerCategory}>Entertainment</span>
            <span data-category="Bills" className={`cursor-pointer ${category === "Bills" ? "font-bold" : ""}`} onClick={hanndlerCategory}>Bills</span>
            <span data-category="Groceries" className={`cursor-pointer ${category === "Groceries" ? "font-bold" : ""}`} onClick={hanndlerCategory}>Groceries</span>
            <span data-category="Dining Out" className={`cursor-pointer ${category === "Dining Out" ? "font-bold" : ""}`} onClick={hanndlerCategory}>Dining Out</span>
            <span data-category="Transportation" className={`cursor-pointer ${category === "Transportation" ? "font-bold" : ""}`} onClick={hanndlerCategory}>Transportation</span>
            <span data-category="Personal Care" className={`cursor-pointer ${category === "Personal Care" ? "font-bold" : ""}`} onClick={hanndlerCategory}>Personal Care</span>
        </div>
    )
}

export default MenuCategory
