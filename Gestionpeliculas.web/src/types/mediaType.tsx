export interface Media {
  _id: string;
  serial: string;
  titulo: string;
  sinopsis: string;
  url: string;
  imagen: string;
  anioEstreno: number;
  genero: { _id: string; nombre: string } | string;
  director: { _id: string; nombre: string } | string;
  productora: { _id: string; nombre: string } | string;
  tipo: { _id: string; nombre: string } | string;
  createdAt?: string;
  updatedAt?: string;
}