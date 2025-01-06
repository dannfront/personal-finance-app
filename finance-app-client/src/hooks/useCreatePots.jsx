import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPot } from "../utils/axios"
import toast from "react-hot-toast"

function useCreatePots() {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createPot,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["data-user"] })
            toast.success("Pot created")
        },
        onError: () => {
            toast.error("Pot could not be created")
        }
    })

    return (
        mutation
    )
}

export default useCreatePots
