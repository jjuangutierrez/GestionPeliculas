import { useCrud } from "../hooks/useCrud";
import type { Productora } from "../types/productoraType";
import * as productoraService from "../service/productoraService";

const INITIAL_FORM: {
  nombre: string;
  estado: "Activo" | "Inactivo";
  slogan: string;
  descripcion: string;
} = {
  nombre: "",
  estado: "Activo",
  slogan: "",
  descripcion: "",
};

const service = {
  getAll: productoraService.getProductoras,
  create: productoraService.createProductora,
  update: productoraService.updateProductora,
  delete: productoraService.deleteProductora,
};

function Productoras() {
  const {
    items,
    form,
    editId,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    setForm,
    setEditId,
  } = useCrud<Productora>(service, INITIAL_FORM);

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setEditId(null);
  };

  return (
    <>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 fw-semibold">Gestión de Productoras</h4>
        <span className="text-muted small">{items.length} registros</span>
      </div>

      {/* Formulario */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white fw-medium">
          {editId ? "Editar Productora" : "Nueva Productora"}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-12 col-md-5">
                <label className="form-label">Nombre</label>
                <input
                  name="nombre"
                  type="text"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Slogan</label>
                <input
                  name="slogan"
                  type="text"
                  className="form-control"
                  value={form.slogan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">Estado</label>
                <select
                  name="estado"
                  className="form-select"
                  value={form.estado}
                  onChange={handleChange}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea
                  name="descripcion"
                  className="form-control"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>

              <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-primary btn-responsive">
                  {editId ? "Actualizar" : "Guardar"}
                </button>

                {editId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-responsive ms-md-2"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                )}
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* Tabla */}
      <div className="card shadow-sm">
        <div className="card-header bg-white fw-medium">
          Listado de Productoras
        </div>

        {items.length === 0 ? (
          <div className="card-body text-center text-muted py-5">
            No hay productoras registradas.
          </div>
        ) : (
          <>
            {/* Vista tabla */}
            <div className="table-responsive d-none d-md-block">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 48 }}>#</th>
                    <th>Nombre</th>
                    <th>Slogan</th>
                    <th>Descripción</th>
                    <th style={{ width: 120 }}>Estado</th>
                    <th style={{ width: 160 }}>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((p, i) => (
                    <tr key={p._id}>
                      <td className="text-muted small">{i + 1}</td>

                      <td style={{ maxWidth: 180 }}>{p.nombre}</td>

                      <td
                        className="text-muted small fst-italic"
                        style={{ maxWidth: 200 }}
                      >
                        {p.slogan}
                      </td>

                      <td style={{ maxWidth: 260 }}>
                        <span
                          className="d-inline-block text-truncate"
                          style={{ maxWidth: 240 }}
                          title={p.descripcion}
                        >
                          {p.descripcion}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            p.estado === "Activo" ? "bg-success" : "bg-secondary"
                          }`}
                        >
                          {p.estado}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => handleEdit(p)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(p._id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista móvil */}
            <div className="d-md-none">
              {items.map((p, i) => (
                <div key={p._id} className="card mb-2">
                  <div className="card-body py-2">

                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div>
                        <span className="text-muted small me-2">#{i + 1}</span>
                        <span className="fw-medium">{p.nombre}</span>
                      </div>
                      <span
                        className={`badge ${
                          p.estado === "Activo" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {p.estado}
                      </span>
                    </div>

                    <p className="text-muted small fst-italic mb-1">{p.slogan}</p>
                    <p className="small text-truncate mb-2">{p.descripcion}</p>

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEdit(p)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(p._id)}
                      >
                        Eliminar
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Productoras;