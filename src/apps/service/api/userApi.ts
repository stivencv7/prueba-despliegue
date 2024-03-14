import axios from "axios";
export const userApi = axios.create({

    baseURL:'http://localhost:8080/api',
    headers: {
      'Content-Type': 'application/json',
    },
  
  });