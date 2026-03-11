import api from "./api";

export const getTipos = async () => {
  const res = await api.get("/tipos");
  return res.data;
};

export const createTipo = async (data: any) => {
  const res = await api.post("/tipos", data);
  return res.data;
};

export const updateTipo = async (id: string, data: any) => {
  const res = await api.put(`/tipos/${id}`, data);
  return res.data;
};

export const deleteTipo = async (id: string) => {
  const res = await api.delete(`/tipos/${id}`);
  return res.data;
};