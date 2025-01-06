import ShowNumberPage from "./ShowNumberPage";

function PageNumber({ arrayLength, pageNumber }) {
    const totalPages = Math.round(arrayLength / 10) === 0 ? 1 : Math.round(arrayLength / 10)
    const pages = Array.from({ length: totalPages }, ((_, i) => i + 1))

    return (
        <ul className="flex gap-1">
            {
                pages.map(page => <ShowNumberPage className=" hidden lg:block" page={page} pageNumber={pageNumber} key={page} />)
            }


            <ShowNumberPage className="lg:hidden" page={pages.at(0)} pageNumber={pageNumber} />

            {
                pages.slice(1, -1).map((page) => {

                    if (page === pageNumber) return <ShowNumberPage className="lg:hidden" page={page} pageNumber={pageNumber} key={page} />

                })
            }

            <li className={`h-[40px] content-center border border-Grey-500 rounded-lg w-10 lg:hidden`}> <span className="block max-w-[90%] w-3 mx-auto">...</span> </li>


            <ShowNumberPage className="lg:hidden" page={pages.at(-1)} pageNumber={pageNumber} />



        </ul>
    )
}

export default PageNumber
