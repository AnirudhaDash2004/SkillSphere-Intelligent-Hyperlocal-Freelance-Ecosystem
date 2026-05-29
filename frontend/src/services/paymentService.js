import api from "./api.js";

export const getAll = () => api.get("/payments").then((res) => res.data);
export const getOne = (id) => api.get("/payments/" + id).then((res) => res.data);
export const create = (data) => api.post("/payments", data).then((res) => res.data);
export const update = (id, data) => api.put("/payments/" + id, data).then((res) => res.data);
