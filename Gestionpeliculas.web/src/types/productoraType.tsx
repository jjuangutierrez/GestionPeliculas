export interface Productora {
  _id: string;
  nombre: string;
  estado: "Activo" | "Inactivo";
  slogan: string;
  descripcion: string;
  createdAt?: string;
  updatedAt?: string;
}