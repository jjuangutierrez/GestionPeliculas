import { useCrud } from "../hooks/useCrud";
import type { Tipo } from "../types/tipoType";
import * as tipoService from "../service/tipoService";

const INITIAL_FORM: {
  nombre: string;
  descripcion: string;
} = {
  nombre: "",
  descripcion: "",
};

const service = {
  getAll: tipoService.getTipos,
  create: tipoService.createTipo,
  update: tipoService.updateTipo,
  delete: tipoService.deleteTipo,
};

function Tipos() {
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
  } = useCrud<Tipo>(service, INITIAL_FORM);

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setEditId(null);
  };

  return (
    <>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 fw-semibold">Gestión de Tipos</h4>
        <span className="text-muted small">{items.length} registros</span>
      </div>

      {/* Formulario */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white fw-medium">
          {editId ? "Editar Tipo" : "Nuevo Tipo"}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-12 col-md-4">
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

              <div className="col-12 col-md-8">
                <label className="form-label">Descripción</label>
                <input
                  name="descripcion"
                  type="text"
                  className="form-control"
                  value={form.descripcion}
                  onChange={handleChange}
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
          Listado de Tipos
        </div>

        {items.length === 0 ? (
          <div className="card-body text-center text-muted py-5">
            No hay tipos registrados.
          </div>
        ) : (
          <>
            {/* Vista tabla */}
            <div className="table-responsive d-none d-md-block">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 48 }}>#</th>
                    <th style={{ width: 200 }}>Nombre</th>
                    <th>Descripción</th>
                    <th style={{ width: 160 }}>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((t, i) => (
                    <tr key={t._id}>
                      <td className="text-muted small">{i + 1}</td>

                      <td>{t.nombre}</td>

                      <td>
                        <span
                          className="d-inline-block text-truncate"
                          style={{ maxWidth: 400 }}
                          title={t.descripcion}
                        >
                          {t.descripcion}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => handleEdit(t)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(t._id)}
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
              {items.map((t, i) => (
                <div key={t._id} className="card mb-2">
                  <div className="card-body py-2">

                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div>
                        <span className="text-muted small me-2">#{i + 1}</span>
                        <span className="fw-medium">{t.nombre}</span>
                      </div>
                    </div>

                    <p className="small text-truncate mb-2" title={t.descripcion}>
                      {t.descripcion}
                    </p>

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEdit(t)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(t._id)}
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

export default Tipos;