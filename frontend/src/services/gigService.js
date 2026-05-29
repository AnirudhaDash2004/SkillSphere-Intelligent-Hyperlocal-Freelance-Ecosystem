import api from "./api.js";

export const getAll = () => api.get("/gigs").then((res) => res.data);
export const getOne = (id) => api.get("/gigs/" + id).then((res) => res.data);
export const create = (data) => api.post("/gigs", data).then((res) => res.data);
export const update = (id, data) => api.put("/gigs/" + id, data).then((res) => res.data);
