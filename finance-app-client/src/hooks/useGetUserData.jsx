import { useQuery } from "@tanstack/react-query"
import { getUserData } from "../utils/axios"

function useGetUserData() {
    const { data: { data } } = useQuery({
        queryKey: ["data-user"],
        queryFn: getUserData,
        suspense: true
    })



    return {
        data
    }
}

export default useGetUserData
