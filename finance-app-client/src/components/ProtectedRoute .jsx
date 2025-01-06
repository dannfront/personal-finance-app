import { Suspense, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isAuthAxios } from "../utils/axios"
import Loader from "./Loader"

function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        async function verifyToken() {
            try {
                const res = await isAuthAxios()



                if (!res.data.isAuth) {
                    navigate("/login")

                    setIsAuth(false)
                    return
                }

                setIsAuth(true)

            } catch (error) {
                console.log(error);

                navigate("/login")

            }
        }

        verifyToken()

    }, [navigate])

    return (
        isAuth ? children : <Loader />
    )
}

export default ProtectedRoute 
