import axios from "axios"

export const axiosInstace = axios.create({
     baseURL: "http://localhost/Replica-of-IndiaMart/Backend/src/index.php",
     withCredentials:true ,
     headers:{
        "Content-Type": "application/json",
    }
})