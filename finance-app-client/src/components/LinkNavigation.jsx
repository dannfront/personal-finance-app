import { NavLink } from "react-router-dom"

function LinkNavigation({ titleLink = "", isMinimize = false }) {

    const recurringBills = titleLink === "Recurring Bills" ? titleLink.split(" ").join("-").toLowerCase() : undefined

    const urlImages = `src/assets/images/icon-nav-${recurringBills ?? titleLink.toLowerCase()}.svg`
    const firstLetterUpperCase = titleLink.at(0).toUpperCase() + titleLink.slice(1)

    return (
        <NavLink className={`testElement relative w-14 nav__link md:w-28 text-base h-10 flex items-center justify-center lg:pr-2 lg:w-full lg:pl-4 ${isMinimize ? "mx-auto w-5" : ""}`} to={`${titleLink === "overview" ? "/" : `/${recurringBills ?? titleLink}`}`} viewTransition >


            {isMinimize ?

                <img src={urlImages} alt={titleLink} className="w-5" />
                :

                <>

                    <div className="md:flex md:flex-col md:items-center md:text-sm">
                        <img src={urlImages} alt={titleLink} className="lg:hidden" />
                        <p className="hidden md:block lg:hidden" >{firstLetterUpperCase}</p>
                    </div>

                    <div className="hidden lg:flex lg:gap-2 lg:w-full nav__link-item2">
                        <div>

                            <img src={urlImages} alt="overview" className="hidden lg:block" />
                            <p className="hidden md:block lg:hidden" >{firstLetterUpperCase}</p>
                        </div>

                        {firstLetterUpperCase}
                    </div>
                </>
            }
        </NavLink>
    )
}

export default LinkNavigation
