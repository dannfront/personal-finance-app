import { useEffect, useState } from "react"
import LinkNavigation from "../../../components/LinkNavigation"

function AsideBar() {
    const linkTitles = ["overview", "transactions", "budgets", "pots", "Recurring Bills"]
    const [isMinimize, setIsMinimize] = useState(false)


    useEffect(() => {
        const asideBar = document.querySelector("#aside-bar")

        isMinimize ? asideBar.style.width = "100px" : asideBar.style.width = "100%"


    }, [isMinimize])

    function toogleMinimize() {

        setIsMinimize(!isMinimize)
    }

    return (
        <aside className="item__grid-1 h-[70px]  rounded-t-lg w-full lg:pr-4 lg:flex lg:flex-col  text-Grey-300 font-semibold bg-Grey-900 lg:rounded-l-none lg:rounded-r-lg lg:w-[220px] lg:h-screen lg:items-center" id="aside-bar">

            <div className="w-full h-full lg:space-y-20 lg:h-[90%]">
                <div className={`lg:mt-5 ${isMinimize ? "lg:pl-4" : ""}`}>

                    <div className={`hidden pl-4 lg:block lg:mt-2 ${isMinimize ? "lg:flex lg:items-center lg:justify-center lg:w-full lg:p-0" : ""}`} >
                        {
                            isMinimize ?
                                <img src="src/assets/images/logo-small.svg" alt="logo" />
                                :
                                <img src="src/assets/images/logo-large.svg" alt="logo" />
                        }
                    </div>
                </div>

                <nav className={`h-full flex items-end justify-evenly lg:h-auto lg:flex-col lg:justify-start lg:items-start lg:gap-5 lg:px-0 `} aria-label="Main Navigation" >
                    {
                        linkTitles.map((title, i) => <LinkNavigation titleLink={`${title}`} key={i} isMinimize={isMinimize} />)
                    }
                </nav>

            </div>

            <div className="hidden lg:block">
                <button onClick={toogleMinimize} id="minimize-menu">
                    <div className="lg:flex lg:gap-2 lg:items-center">
                        {
                            isMinimize ?
                                <img className="w-full" src="src/assets/images/icon-maximize-menu.svg" alt="icon-maximize" /> :
                                <>

                                    <img src="src/assets/images/icon-minimize-menu.svg" alt="overview" className="hidden lg:block" />

                                    <span>
                                        Minimize Menu
                                    </span>
                                </>
                        }
                    </div>

                </button>
            </div>
        </aside >
    )
}

export default AsideBar
