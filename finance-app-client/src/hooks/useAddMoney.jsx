import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddMoney from "../features/pots/components/AddMoney";
import toast from "react-hot-toast";
import { addMoneyPots } from "../utils/axios";

function useAddMoney() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ id, amount }) => {

            return addMoneyPots(id, amount)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: "data-user" })
            toast.success("Money added")
        },
        onError: () => {
            toast.error("Error")
        }
    })
    return (
        mutation
    )
}

export default useAddMoney
