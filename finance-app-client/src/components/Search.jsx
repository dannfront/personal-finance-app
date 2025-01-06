function Search({ placeholder, setSearchByName }) {

    function handlerSearch(e) {
        setSearchByName(e.target.value.toLowerCase())
    }

    return (
        <div className="w-[170px] md:w-[250px]">
            <input onChange={handlerSearch} className="inputs icon__search text-sm" type="text" placeholder={placeholder} />
        </div>
    )
}

export default Search
