import api from "./api.js";

export const getAll = () => api.get("/proposals").then((res) => res.data);
export const getOne = (id) => api.get("/proposals/" + id).then((res) => res.data);
export const create = (data) => api.post("/proposals", data).then((res) => res.data);
export const update = (id, data) => api.put("/proposals/" + id, data).then((res) => res.data);
