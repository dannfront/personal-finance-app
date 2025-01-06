import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteBudget, deletePots } from "../utils/axios"

function useDelete(type = "budget") {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id) => {
            if (type === "budget") {
                return deleteBudget(id)
            } else {
                return deletePots(id)
            }
        },
        onSuccess: () => {
            toast.success(`${type} deleted`)
            queryClient.invalidateQueries({ queryKey: ["data-user"] })
        },
        onError: () => {
            toast.error(`the ${type} could not be deleted`)
        }

    })
    return (
        mutation
    )
}

export default useDelete

