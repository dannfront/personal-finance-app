import toast from "react-hot-toast"
import { updateBudget } from "../utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function useUpdateBudget() {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({ id, data }) => {
            updateBudget(id, data
            )
        },
        onSuccess: () => {
            toast.success("Budget Created")
            queryClient.invalidateQueries({ queryKey: ["data-user"] })
        },
        onError: () => {
            toast.error("Budget could not be created")
        }
    })
    return (
        mutation
    )
}

export default useUpdateBudget
