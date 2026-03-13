export interface Director {
  _id: string;
  nombre: string;
  estado: "Activo" | "Inactivo";
  createdAt?: string;
  updatedAt?: string;
}