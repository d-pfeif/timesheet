import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "localhost:3000", // Set your API base URL
  timeout: 5000, // Set the request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Set common headers
  },
});

export default axiosInstance;
