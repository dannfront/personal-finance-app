import { Outlet } from "react-router-dom";
import IlustratorAuth from "./components/IlustratorAuth";

function LayoutAuth() {
    //todo logica api
    return (
        <>
            <main className="h-screen grid-layout">
                <IlustratorAuth />

                <div className="h-[69px] w-full bg-Grey-900 content-center rounded-b-lg lg:hidden">
                    <img className="mx-auto" src="images/logo-large.svg" alt="logo" />
                </div>

                <div className="flex items-center">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default LayoutAuth;