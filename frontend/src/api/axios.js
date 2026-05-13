import axios from "axios"

const rawBaseUrl = import.meta.env.VITE_API_URL?.trim()

if (!rawBaseUrl) {
    console.warn(
        "VITE_API_URL is not set. Using local fallback http://localhost:8000/api/v1."
    )
}

const api = axios.create({
    baseURL: rawBaseUrl || "http://localhost:8000/api/v1"
})


api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization =  `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use((response) => response, (error) => {
    if(error.response?.status === 401){
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return Promise.reject(error)
})

export default api;
