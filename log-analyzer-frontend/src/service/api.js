import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const analyzeLogs = async (formData) => {
  const response = await api.post("/analyze", formData);
  return response.data;
};

export default api;