import api from "./api";

export const getMedia = async () => {
  const res = await api.get("/media");
  return res.data;
};

export const createMedia = async (data: any) => {
  const res = await api.post("/media", data);
  return res.data;
};

export const updateMedia = async (id: string, data: any) => {
  const res = await api.put(`/media/${id}`, data);
  return res.data;
};

export const deleteMedia = async (id: string) => {
  const res = await api.delete(`/media/${id}`);
  return res.data;
};