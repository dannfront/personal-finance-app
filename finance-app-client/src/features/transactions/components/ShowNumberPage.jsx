function ShowNumberPage({ pageNumber, page, className }) {
    return (
        <li className={`content-center h-[40px] border border-Grey-500 rounded-lg w-10 ${className} ${pageNumber === page ? "bg-Grey-900 text-white" : ""}`} key={page}>
            <span className="block max-w-[90%] w-3 mx-auto">

                {page}

            </span>
        </li>
    )
}

export default ShowNumberPage
