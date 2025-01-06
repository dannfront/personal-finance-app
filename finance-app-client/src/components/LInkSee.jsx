import { Link } from "react-router-dom"

function LinkSee({ textButton, to }) {
    return (
        <Link className="text-Grey-500 flex gap-3" to={to}> <span className="block">{textButton}</span> <img src="src/assets/images/icon-caret-right.svg" alt="icon-caret-right" /></Link>
    )
}

export default LinkSee
