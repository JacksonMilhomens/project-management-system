import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://project-management-wobh.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
