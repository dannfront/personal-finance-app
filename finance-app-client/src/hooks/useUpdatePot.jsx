import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePot } from "../utils/axios"
import toast from "react-hot-toast"

function useUpdatePot() {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({ id, body }) => {
            console.log(body);

            updatePot(id, body)
        },
        onSuccess: () => {
            toast.success("edited")
            queryClient.invalidateQueries({ queryKey: ["data-user"] })
        },
        onError: () => {
            toast.error("could not be edited")
        }
    })
    return (
        mutation
    )
}

export default useUpdatePot
