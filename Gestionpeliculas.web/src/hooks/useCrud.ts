import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function useCrud<T extends { _id: string }>(
  service: {
    getAll: () => Promise<T[]>;
    create: (data: any) => Promise<T>;
    update: (id: string, data: any) => Promise<T>;
    delete: (id: string) => Promise<void>;
  },
  initialForm: any
) {

  const [items, setItems] = useState<T[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await service.getAll();
      setItems(data);
    } catch {
      Swal.fire("Error", "No se pudieron cargar los registros", "error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId) {
        await service.update(editId, form);

        Swal.fire({
          icon: "success",
          title: "Actualizado",
          text: "Registro actualizado correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await service.create(form);

        Swal.fire({
          icon: "success",
          title: "Guardado",
          text: "Registro creado correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setForm(initialForm);
      setEditId(null);
      load();

    } catch {
      Swal.fire("Error", "Ocurrió un problema al guardar", "error");
    }
  };

  const handleEdit = (item: T) => {
    const { _id, ...rest } = item;
    setForm(rest);
    setEditId(_id);
  };

  const handleDelete = async (id: string) => {

    const result = await Swal.fire({
      title: "¿Eliminar registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
    });

    if (!result.isConfirmed) return;

    try {
      await service.delete(id);

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Registro eliminado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });

      load();

    } catch {
      Swal.fire("Error", "No se pudo eliminar el registro", "error");
    }
  };

  return {
    items,
    form,
    editId,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    setForm,
    setEditId,
  };
}