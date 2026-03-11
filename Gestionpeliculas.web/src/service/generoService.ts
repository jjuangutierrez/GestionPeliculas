import api from "./api";

export const getGeneros = async () => {
  const res = await api.get("/generos");
  return res.data;
};

export const getGenero = async (id: string) => {
  const res = await api.get(`/generos/${id}`);
  return res.data;
};

export const createGenero = async (data: any) => {
  const res = await api.post("/generos", data);
  return res.data;
};

export const updateGenero = async (id: string, data: any) => {
  const res = await api.put(`/generos/${id}`, data);
  return res.data;
};

export const deleteGenero = async (id: string) => {
  const res = await api.delete(`/generos/${id}`);
  return res.data;
};