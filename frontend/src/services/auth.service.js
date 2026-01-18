import api from "../api/axios";

export const registerUser = async(data) => {
    const res = await api.post("/user/register", data)
    return res.data
}