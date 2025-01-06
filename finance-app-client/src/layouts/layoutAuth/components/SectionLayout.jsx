function SectionLayout({ children }) {
    return (
        <section className="bg-white max-w-[90%] w-[320px]  mx-auto p-5 rounded-lg sm:w-[450px] md:w-[560px]  lg:w-[500px]">
            {
                children
            }
        </section>
    )
}

export default SectionLayout
