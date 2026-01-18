import api from "../api/axios";

export const registerUser = async(data) => {
    const res = await api.post("/user/register", data)
    return res.data
}

export const loginUser = async (data) => {
    const res = await api.post("/user/login", data)
    return res.data
}

export const profileUser = async(token) => {
    return await api.get("/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}