import { useState } from "react"
import Button from "../../../components/Button"

import { Controller, set, useForm } from "react-hook-form"
import SelectTheme from "../../budgtes/components/SelectTheme"
import useUpdatePot from "../../../hooks/useUpdatePot"
import useCreatePots from "../../../hooks/useCreatePots"

function AddNewPot({ handleCloseModal, data, current, type = "create" }) {
    const mutationUpdate = useUpdatePot()
    const mutationCreated = useCreatePots()
    const defaultName = data?.name ?? ""
    const defaultTheme = data?.theme ?? "Green"
    const defaultTotal = data?.target ?? 0
    const [theme, setTheme] = useState(defaultTheme)
    const [Nametheme, setNameTheme] = useState("Green")

    const { control, handleSubmit, setValue, register, formState: { errors } } = useForm({
        defaultValues: {
            name: defaultName,
            theme: defaultTheme,
            target: defaultTotal
        }
    })

    function onSubmit(body) {

        if (type === "create") {
            // mutation.mutate(data)
            mutationCreated.mutate({ ...body, target: +body.target })
            handleCloseModal()
        } else {

            mutationUpdate.mutate({ id: data._id, body: { ...body, target: +body.target } })

            handleCloseModal()
        }

    }

    return (
        <section className=" create-budget bg-white w-[355px] max-w-[90%] mx-auto rounded-lg p-5 md:w-[500px]">
            <div>
                <h2 className="text-gray-900 text-xl font-bold">
                    {type === "create" ? "Add New Pot" : "Edit Pot"}
                </h2>

            </div>
            <p className="text-gray-500 text-wrap mt-3">
                {type === "create" ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases." : "If your saving targets change, feel free to update your pots."}
            </p>

            <form id="create-budget" className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="pot-name" className="text-gray-500 font-bold text-sm">Pot Name</label>
                    <input className="border border-Beige-500 p-3 w-full rounded-lg" placeholder="e.g. Rainy Days" type="text" name="add-pot" id="pot-name" {...register("name", {
                        required: {
                            value: true,
                            message: "name is required"
                        }, maxLength: {
                            value: 30,
                            message: "maximum 30 characters"
                        }
                    })} />
                    {errors.name && <p className="text-red-500 pl-2 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="maximum" className="text-gray-500 font-bold text-sm">Target</label>
                    <input className="border border-Beige-500 p-3 w-full rounded-lg " type="number" min={1} placeholder="$  e.g. 2000" id="target" {...register("target", {
                        required: {
                            value: true,
                            message: "field is required"
                        },
                        max: {
                            value: current,
                            message: "The amount must not be your current balance"
                        }

                    })} />
                    {errors.target && <p className="text-red-500 pl-2 text-sm">{errors.target.message}</p>}
                </div>
                <div>
                    <label htmlFor="" className="text-gray-500 font-bold text-sm">Theme</label>
                    <Controller
                        name="theme"
                        control={control}
                        render={({ field }) => (

                            <SelectTheme {...field} theme={Nametheme} setNameTheme={setNameTheme} setTheme={theme => {
                                setTheme(theme)
                                setValue("theme", theme)
                            }} />
                        )}
                    />
                </div>
                <Button disabled={mutationUpdate.isLoading || mutationCreated.isLoading} className="bg-gray-950 text-white w-full p-5 mt-5 hover:bg-gray-500" idform="create-budget" form>
                    {mutationUpdate.isLoading || mutationCreated.isLoading ? "Loading..." : "Add Budget"}
                </Button>
            </form>
        </section>
    )
}

export default AddNewPot
