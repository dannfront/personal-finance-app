function ListCategory({ isOpen, setSelectCategory }) {

    const categories = [
        { category: "Entertainment" },
        { category: "Bills" },
        { category: "Groceries" },
        { category: "Dining Out" },
        { category: "Transportation" },
        { category: "Personal Care" },
        { category: "Education" },
        { category: "Lifestyle" },
        { category: "Shopping" },
        { category: "General" },
    ];
    return (
        <ul className="absolute z-50 top-16 w-full bg-white rounded-lg overflow-y-scroll h-[250px] shadow-[0px_-2px_10px_0px_rgba(51,_65,_85,_0.12)] divide-gray-100 divide-y-2 color-scroll">
            {categories.map((category, i) => <li onClick={() => setSelectCategory(category.category)} className="p-3 cursor-pointer" key={i}>{category.category}</li>)}
        </ul>
    )
}

export default ListCategory
