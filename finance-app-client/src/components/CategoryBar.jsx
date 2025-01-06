import { numberFormat } from "../utils/functions"

function CategoryBar({ amount, theme, title = "" }) {

    return (

        <div className="relative content-center">
            <div className="bar w-[125px] pl-2" style={{ '--theme-bar-color': theme }}>
                <p className="text-Grey-500 text-sm">{title}</p>
                <p className="font-bold md:text-xl">{numberFormat(amount)}</p>
            </div>

        </div>

    )
}

export default CategoryBar
