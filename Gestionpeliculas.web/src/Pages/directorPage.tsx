import { useCrud } from "../hooks/useCrud";
import type { Director } from "../types/directorType";
import * as directorService from "../service/directorService";

const INITIAL_FORM: { nombre: string; estado: "Activo" | "Inactivo" } = {
  nombre: "",
  estado: "Activo",
};

const service = {
  getAll: directorService.getDirectores,
  create: directorService.createDirector,
  update: directorService.updateDirector,
  delete: directorService.deleteDirector,
};

function Directores() {
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
  } = useCrud<Director>(service, INITIAL_FORM);

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setEditId(null);
  };

  return (
    <>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 fw-semibold">Gestión de Directores</h4>
        <span className="text-muted small">{items.length} registros</span>
      </div>

      {/* Formulario */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white fw-medium">
          {editId ? "Editar Director" : "Nuevo Director"}
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

              <div className="col-12 col-md-4 d-grid gap-2 d-md-flex align-items-end justify-content-md-end">
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
          Listado de Directores
        </div>

        {items.length === 0 ? (
          <div className="card-body text-center text-muted py-5">
            No hay directores registrados.
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
                    <th style={{ width: 120 }}>Estado</th>
                    <th style={{ width: 160 }}>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((d, i) => (
                    <tr key={d._id}>
                      <td className="text-muted small">{i + 1}</td>

                      <td style={{ maxWidth: 320 }}>{d.nombre}</td>

                      <td>
                        <span
                          className={`badge ${
                            d.estado === "Activo" ? "bg-success" : "bg-secondary"
                          }`}
                        >
                          {d.estado}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => handleEdit(d)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(d._id)}
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
              {items.map((d, i) => (
                <div key={d._id} className="card mb-2">
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="text-muted small me-2">#{i + 1}</span>
                        <span className="fw-medium">{d.nombre}</span>
                      </div>
                      <span
                        className={`badge ${
                          d.estado === "Activo" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {d.estado}
                      </span>
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEdit(d)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(d._id)}
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

export default Directores;