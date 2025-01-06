import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBudget } from "../utils/axios"
import toast from "react-hot-toast"

function useAddBudget() {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createBudget,
        onSuccess: () => {
            toast.success("Budget Created")
            queryClient.invalidateQueries({ queryKey: ["data-user"] })
        },
        onError: () => {
            toast.error("budget could not be created")
        }
    })
    return (
        mutation
    )
}

export default useAddBudget
