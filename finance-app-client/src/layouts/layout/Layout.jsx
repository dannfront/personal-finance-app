import { Outlet } from "react-router-dom"
import AsideBar from "./components/AsideBar"

function Layout() {
    return (

        <div className="grid-layout-main h-screen">

            <AsideBar />

            <div className="item__grid-2 p-5">
                <Outlet />
            </div>

        </div>

    )
}

export default Layout
