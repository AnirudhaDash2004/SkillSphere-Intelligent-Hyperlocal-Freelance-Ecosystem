import api from "./api.js";

export const getAll = () => api.get("/reviews").then((res) => res.data);
export const getOne = (id) => api.get("/reviews/" + id).then((res) => res.data);
export const create = (data) => api.post("/reviews", data).then((res) => res.data);
export const update = (id, data) => api.put("/reviews/" + id, data).then((res) => res.data);
