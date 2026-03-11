import api from "./api";

export const getDirectores = async () => {
  const res = await api.get("/directores");
  return res.data;
};

export const createDirector = async (data: any) => {
  const res = await api.post("/directores", data);
  return res.data;
};

export const updateDirector = async (id: string, data: any) => {
  const res = await api.put(`/directores/${id}`, data);
  return res.data;
};

export const deleteDirector = async (id: string) => {
  const res = await api.delete(`/directores/${id}`);
  return res.data;
};