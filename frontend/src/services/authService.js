import api from "./api.js";

export const getAll = () => api.get("/auth").then((res) => res.data);
export const getOne = (id) => api.get("/auth/" + id).then((res) => res.data);
export const create = (data) => api.post("/auth", data).then((res) => res.data);
export const update = (id, data) => api.put("/auth/" + id, data).then((res) => res.data);
