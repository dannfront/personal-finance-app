import { useMutation, useQueryClient } from "@tanstack/react-query";
import { withdrawMoneyPots } from "../utils/axios";
import toast from "react-hot-toast";

function useWithdraw() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ id, amount }) => {
            return await withdrawMoneyPots(id, amount)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: "data-user" })
            toast.success("money withdrawn")
        },
        onError: () => {
            toast.error("Error")
        }
    })
    return (
        mutation
    )
}

export default useWithdraw
