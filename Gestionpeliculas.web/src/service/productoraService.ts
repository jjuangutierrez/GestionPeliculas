import api from "./api";

export const getProductoras = async () => {
  const res = await api.get("/productoras");
  return res.data;
};

export const createProductora = async (data: any) => {
  const res = await api.post("/productoras", data);
  return res.data;
};

export const updateProductora = async (id: string, data: any) => {
  const res = await api.put(`/productoras/${id}`, data);
  return res.data;
};

export const deleteProductora = async (id: string) => {
  const res = await api.delete(`/productoras/${id}`);
  return res.data;
};