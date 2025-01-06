import { useEffect, useState } from "react"

function useLocalStorage(keyLocalStorage, initialValue) {
    const [financeLocalStorage, setFinanceLocalStorage] = useState(() => {

        const data = localStorage.getItem(keyLocalStorage)

        return data ? JSON.parse(data) : initialValue

    })

    useEffect(() => {
        try {

            localStorage.setItem(keyLocalStorage, JSON.stringify(financeLocalStorage));
        } catch (error) {
            console.error(error);

        }
    }, [financeLocalStorage, keyLocalStorage])

    return [financeLocalStorage, setFinanceLocalStorage]
}

export default useLocalStorage
