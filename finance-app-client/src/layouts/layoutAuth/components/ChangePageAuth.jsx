import { Link } from "react-router-dom"

function ChangePageAuth({ isRegister }) {
    return (
        <div className="flex items-center justify-center gap-1">
            <p>
                {isRegister ? "Already have an account?" : "Need to create an account?"}
            </p>
            <Link className="font-bold underline decoration-solid text-Grey-900 transition-all hover:text-Grey-500" to={!isRegister ? "/register" : "/login"}>
                {!isRegister ? "Sing up" : "Login"}
            </Link>
        </div>
    )
}

export default ChangePageAuth
