import { useState } from "react"
import Button from "../../../components/Button"
import SelectCategory from "./SelectCategory"
import SelectTheme from "./SelectTheme"
import { Controller, useForm } from "react-hook-form"
import useAddBudget from "../../../hooks/useAddBudget"
import useUpdateBudget from "../../../hooks/useUpdateBudget"

function AddNewBudget({ handleCloseModal, data, id, type = "create" }) {

    const mutationAdd = useAddBudget()
    const mutationUpdate = useUpdateBudget()

    const defaultCategory = data?.category ?? "Entertainment"
    const defaultTheme = data?.theme ?? "Green"
    const defaultMaximum = data?.maximum ?? "Green"
    const [category, setCategory] = useState(defaultCategory)
    const [theme, setTheme] = useState(defaultTheme)
    const [Nametheme, setNameTheme] = useState("Green")

    const { control, handleSubmit, setValue, register } = useForm({
        defaultValues: {
            category: defaultCategory,
            theme: defaultTheme,
            maximum: defaultMaximum
        }
    })

    function onSubmit(data) {
        if (type === "create") {
            mutationAdd.mutate(data)
            return handleCloseModal()
        } else {
            handleCloseModal()
            return mutationUpdate.mutate({ id, data })
        }
    }

    return (
        <section className=" create-budget bg-white w-[355px] max-w-[90%] mx-auto rounded-lg p-5 md:w-[500px]">
            <div>
                <h2 className="text-gray-900 text-xl font-bold">{type === "create" ? "Add New Budget" : "Edit Budget"}</h2>

            </div>
            <p className="text-gray-500 text-wrap mt-3">{
                type === "create" ?
                    "Choose a category to set a spending budget. These categories can help you monitor spending."
                    :
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet."}</p>

            <form id="create-budget" className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="" className="text-gray-500 font-bold ">Budget Category</label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (

                            <SelectCategory {...field} setCategory={(value) => {
                                setCategory(value)
                                setValue("category", value)
                            }} category={category} />
                        )}
                    />
                </div>
                <div>
                    <label htmlFor="maximum" className="text-gray-500 font-bold ">Maximum Spend</label>
                    <input className="border border-Beige-500 p-3 w-full rounded-lg" type="number" min={1} placeholder="$  e.g. 2000" id="maximum" {...register("maximum", { required: true })} />
                </div>
                <div>
                    <label htmlFor="" className="text-gray-500 font-bold ">Theme</label>
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
                <Button className="bg-gray-950 text-white w-full p-5 mt-5 hover:bg-gray-500" idform="create-budget" form>
                    Add Budget
                </Button>
            </form>
        </section>
    )
}

export default AddNewBudget
