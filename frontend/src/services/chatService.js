import api from "./api.js";

export const getAll = () => api.get("/chat").then((res) => res.data);
export const getOne = (id) => api.get("/chat/" + id).then((res) => res.data);
export const create = (data) => api.post("/chat", data).then((res) => res.data);
export const update = (id, data) => api.put("/chat/" + id, data).then((res) => res.data);
