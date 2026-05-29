import api from "./api.js";

export const getAll = () => api.get("/admin").then((res) => res.data);
export const getOne = (id) => api.get("/admin/" + id).then((res) => res.data);
export const create = (data) => api.post("/admin", data).then((res) => res.data);
export const update = (id, data) => api.put("/admin/" + id, data).then((res) => res.data);
