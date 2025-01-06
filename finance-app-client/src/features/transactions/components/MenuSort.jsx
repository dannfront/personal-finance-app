function MenuSort({ sort, setSort }) {
    function hanndlerSort(e) {
        const sortType = e.target.dataset.sort
        if (sort === sortType) return setSort("")
        setSort(sortType)

    }

    return (
        <div className="absolute right-0 top-7 flex flex-col gap-2 bg-white rounded-lg shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1)] p-5 divide-y-[1px] divide-Grey-100 md:w-[113px] md:top-12 md:right-0">
            <span onClick={hanndlerSort} data-sort="latest" className={`cursor-pointer ${sort === "latest" ? "font-bold" : ""}`}>Latest</span>
            <span onClick={hanndlerSort} data-sort="oldest" className={`cursor-pointer ${sort === "oldest" ? "font-bold" : ""}`}>Oldest</span>
            <span onClick={hanndlerSort} data-sort="a-to-z" className={`cursor-pointer ${sort === "a-to-z" ? "font-bold" : ""}`}>A to Z</span>
            <span onClick={hanndlerSort} data-sort="z-to-a" className={`cursor-pointer ${sort === "z-to-a" ? "font-bold" : ""}`}>Z to A</span>
            <span onClick={hanndlerSort} data-sort="highest" className={`cursor-pointer ${sort === "highest" ? "font-bold" : ""}`}>Highest</span>
            <span onClick={hanndlerSort} data-sort="lowest" className={`cursor-pointer ${sort === "lowest" ? "font-bold" : ""}`}>Lowest</span>
        </div>
    )
}

export default MenuSort
