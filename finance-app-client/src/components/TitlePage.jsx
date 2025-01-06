function TitlePage({ children = "" }) {
    return (
        <h1 className="text-Grey-900 capitalize font-semibold text-3xl max-w-fit w-[90%] mb-5">
            {children}
        </h1>
    )
}

export default TitlePage
