import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const chat = async (formData) => {
  const response = await api.post("/chat", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default api;