import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Button from "../../../components/Button"
import ChangePageAuth from "./ChangePageAuth";
import { regexEmail, regexPassword } from "../../../utils/regex";
import { loginAxios, registerAxios } from "../../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function FormAuth({ isRegister }) {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isPending, SetIspending] = useState(false)
    const navigate = useNavigate()
    const typeAuth = isRegister ? "Register" : "Login"
    useEffect(() => {

        const inputPassword = document.querySelector("#password")
        const buttonShowPassword = document.querySelector("#button")

        function tooglePassword() {
            if (inputPassword.type === "password") {
                inputPassword.type = "text"
            } else {
                inputPassword.type = "password"
            }
        }

        buttonShowPassword.addEventListener("click", tooglePassword)

        return () => {
            buttonShowPassword.removeEventListener("click", tooglePassword)
        }
    }, [])

    async function onSubmit(data) {

        if (isRegister) {
            SetIspending(true)
            const res = await registerAxios(data)
            if (res.error) {
                toast.error(res.error)
                return SetIspending(false)

            }
            SetIspending(false)
            return navigate("/")
        }

        SetIspending(true)
        const res = await loginAxios(data)
        if (res.error) {
            toast.error(res.error)
            return SetIspending(false)
        }
        SetIspending(false)
        return navigate("/")

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="auth">

                {isRegister && <div className="mb-5">
                    <label className="label" htmlFor="name">Name</label>

                    <div className="relative">
                        <input className="inputs" type="Name" name="Name" id="name" {...register("name", {
                            required: {
                                value: true,
                                message: "name is required"
                            },
                            minLength: {
                                value: 6,
                                message: "The name must have a length greater than or equal to 6"
                            }
                        })} />
                        {errors.name && <p className="text-Red text-sm">{errors.name.message}</p>}
                    </div>
                </div>}

                <div className="mb-5">
                    <label className="label" htmlFor="email">Email</label>
                    <div>

                        <input className="inputs" type="email" name="email" id="email" {...register("email", {
                            required: {
                                value: true,
                                message: "email is required"
                            },
                            pattern: {
                                value: regexEmail,
                                message: "email is not valid"
                            }

                        })} />
                        {errors.email && <p className="text-Red text-sm">{errors.email.message}</p>}

                    </div>
                </div>


                <div className="mb-5">

                    <label className="label" htmlFor="email">Password</label>
                    <div className="relative">

                        <input className="inputs" type="password" name="password" id="password" {...register("password", {
                            required: {
                                value: true,
                                message: "password is required"
                            },
                            pattern: {
                                value: regexPassword,
                                message: "The password must contain at least one uppercase letter, one digit and one special character."
                            }
                        })} />

                        <button type="button" id="button" className="absolute right-2 top-4">
                            <img src="src/assets/images/icon-show-password.svg" alt="show-password" />
                        </button>
                        {errors.password && <p className="text-Red text-sm">{errors.password.message}</p>}

                    </div>
                </div>


                <Button form idform="auth" bgColor="bg-Grey-900" className="w-full p-3" textColor="text-white" hover="hover:bg-Grey-500" disabled={isPending}>

                    {isPending ? "loading..." : typeAuth}

                </Button>
            </form >

            <ChangePageAuth isRegister={isRegister} />
        </>
    )
}

export default FormAuth
