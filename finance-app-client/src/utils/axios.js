import axios from "axios"

const instanceAxios = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND,
    withCredentials: true
})

export async function loginAxios(body) {
    try {
        const data = await instanceAxios.post("auth/login", body)
        console.log(data.data);

        return data
    } catch (error) {
        console.log(error);
        return error.response?.data

    }
}

export async function registerAxios(body) {
    try {
        const data = await instanceAxios.post("auth/register", body)
        return data
    } catch (error) {
        console.log(error);
        return error.response?.data
    }
}

export async function isAuthAxios() {
    try {
        const data = await instanceAxios.get("auth/isAuth")
        console.log(data);

        return data

    } catch (error) {
        console.log(error);
        return undefined
    }
}

export async function getUserData() {
    try {
        const data = await instanceAxios.get("user/getUser")
        return data
    } catch (error) {
        console.log(error);
        return undefined
    }
}

export async function createBudget(body) {
    try {
        await instanceAxios.post("budgets/createBudget", body)
        return true
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export async function deleteBudget(id) {
    console.log(id);

    try {
        const data = await instanceAxios.delete(`budgets/deleteBudget/${id}`)
        console.log(data.status);

        if (data.status !== 200) {
            throw new Error("Error")
        }
        return true
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function deletePots(id) {
    try {
        const data = await instanceAxios.delete(`pots/deletePots/${id}`)

        if (data.status !== 200) {
            throw new Error("Error")
        }
    } catch (error) {
        console.log(error);

        throw error
    }
}

export async function addBudget(body) {
    try {
        await instanceAxios.post("budgets/createBudget", body)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function updateBudget(id, body) {

    try {
        await instanceAxios.put(`budgets/updateBudget/${id}`, body)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function updatePot(id, body) {
    try {
        await instanceAxios.put(`pots/updatePots/${id}`, body)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function createPot(body) {
    try {
        await instanceAxios.post("pots/createPots", body)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function addMoneyPots(id, amount) {
    try {
        await instanceAxios.post(`pots/addMoney/${id}`, { amount })
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function withdrawMoneyPots(id, amount) {
    try {
        await instanceAxios.post(`pots/withdraw/${id}`, { amount })
    } catch (error) {
        console.log(error);
        throw error
    }
}