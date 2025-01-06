import { numberFormat } from "../../../utils/functions"

function Statistics({ balance }) {
    return (
        <section className="w-full flex flex-col md:flex-row justify-between items-center  gap-3 ">
            <div className="content-center w-full bg-Grey-900 text-white rounded-lg p-5 md:w-[220px] lg:w-[337px] lg:h-[120px]">
                <p className="text-xs">Current Balance</p>
                <p className="font-bold text-xl md:text-3xl">{numberFormat(balance.current)}</p>
            </div>
            <div className="content-center w-full bg-white rounded-lg p-5 md:w-[220px] lg:w-[337px] lg:h-[120px]">

                <p className="text-xs">Income</p>
                <p className="font-bold text-xl md:text-3xl">{numberFormat(balance.income)}</p>
            </div>
            <div className="content-center w-full bg-white rounded-lg p-5 md:w-[220px] lg:w-[337px] lg:h-[120px]">
                <p className="text-xs">Expenses</p>
                <p className="font-bold text-xl md:text-3xl">{numberFormat(balance.expenses)}</p>
            </div>
        </section>
    )
}

export default Statistics
