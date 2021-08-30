import axios from "axios";
import {BASE_URL} from "./config";

const Axios = axios.create({
    baseURL: BASE_URL
})

export default Axios
