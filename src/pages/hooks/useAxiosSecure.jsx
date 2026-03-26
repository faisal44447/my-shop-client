import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // 🔥 MUST
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;