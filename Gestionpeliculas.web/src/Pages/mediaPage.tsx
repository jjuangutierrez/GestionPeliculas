import { useEffect, useState } from "react";
import { useCrud } from "../hooks/useCrud";
import type { Media } from "../types/mediaType";
import type { Genero } from "../types/generoType";
import type { Director } from "../types/directorType";
import type { Productora } from "../types/productoraType";
import type { Tipo } from "../types/tipoType";
import * as mediaService from "../service/mediaService";
import * as generoService from "../service/generoService";
import * as directorService from "../service/directorService";
import * as productoraService from "../service/productoraService";
import * as tipoService from "../service/tipoService";

const INITIAL_FORM = {
  serial: "",
  titulo: "",
  sinopsis: "",
  url: "",
  imagen: "",
  anioEstreno: new Date().getFullYear(),
  genero: "",
  director: "",
  productora: "",
  tipo: "",
};

const service = {
  getAll: mediaService.getMedia,
  create: mediaService.createMedia,
  update: mediaService.updateMedia,
  delete: mediaService.deleteMedia,
};

const getNombre = (val: { _id: string; nombre: string } | string | null | undefined): string => {
  if (!val) return "—";
  return typeof val === "object" ? val.nombre : val;
};

const getId = (val: { _id: string } | string | null | undefined): string => {
  if (!val) return "";
  return typeof val === "object" ? val._id : val;
};

function Medias() {
  const {
    items,
    form,
    editId,
    handleChange,
    handleSubmit,
    handleDelete,
    setForm,
    setEditId,
  } = useCrud<Media>(service, INITIAL_FORM);

  const [generos, setGeneros] = useState<Genero[]>([]);
  const [directores, setDirectores] = useState<Director[]>([]);
  const [productoras, setProductoras] = useState<Productora[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);

  useEffect(() => {
    generoService.getGeneros().then(setGeneros).catch(() => {});
    directorService.getDirectores().then(setDirectores).catch(() => {});
    productoraService.getProductoras().then(setProductoras).catch(() => {});
    tipoService.getTipos().then(setTipos).catch(() => {});
  }, []);

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setEditId(null);
  };

  const handleEdit = (item: Media) => {
    setForm({
      serial: item.serial,
      titulo: item.titulo,
      sinopsis: item.sinopsis,
      url: item.url,
      imagen: item.imagen,
      anioEstreno: item.anioEstreno,
      genero: getId(item.genero),
      director: getId(item.director),
      productora: getId(item.productora),
      tipo: getId(item.tipo),
    });
    setEditId(item._id);
  };

  return (
    <>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 fw-semibold">Gestión de Medias</h4>
        <span className="text-muted small">{items.length} registros</span>
      </div>

      {/* Formulario */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white fw-medium">
          {editId ? "Editar Media" : "Nueva Media"}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-12 col-md-3">
                <label className="form-label">Serial</label>
                <input
                  name="serial"
                  type="text"
                  className="form-control"
                  value={form.serial}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Título</label>
                <input
                  name="titulo"
                  type="text"
                  className="form-control"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">Año de Estreno</label>
                <input
                  name="anioEstreno"
                  type="number"
                  className="form-control"
                  value={form.anioEstreno}
                  onChange={handleChange}
                  min={1900}
                  max={new Date().getFullYear() + 2}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">URL</label>
                <input
                  name="url"
                  type="text"
                  className="form-control"
                  value={form.url}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Imagen (URL)</label>
                <input
                  name="imagen"
                  type="text"
                  className="form-control"
                  value={form.imagen}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">Género</label>
                <select
                  name="genero"
                  className="form-select"
                  value={form.genero}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Seleccionar --</option>
                  {generos
                    .filter((g) => g.estado === "Activo")
                    .map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.nombre}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">Director</label>
                <select
                  name="director"
                  className="form-select"
                  value={form.director}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Seleccionar --</option>
                  {directores
                    .filter((d) => d.estado === "Activo")
                    .map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.nombre}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">Productora</label>
                <select
                  name="productora"
                  className="form-select"
                  value={form.productora}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Seleccionar --</option>
                  {productoras
                    .filter((p) => p.estado === "Activo")
                    .map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.nombre}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">Tipo</label>
                <select
                  name="tipo"
                  className="form-select"
                  value={form.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Seleccionar --</option>
                  {tipos.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Sinopsis</label>
                <textarea
                  name="sinopsis"
                  className="form-control"
                  value={form.sinopsis}
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
          Listado de Medias
        </div>

        {items.length === 0 ? (
          <div className="card-body text-center text-muted py-5">
            No hay medias registradas.
          </div>
        ) : (
          <>
            {/* Vista tabla */}
            <div className="table-responsive d-none d-md-block">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 48 }}>#</th>
                    <th style={{ width: 100 }}>Serial</th>
                    <th>Título</th>
                    <th style={{ width: 80 }}>Año</th>
                    <th style={{ width: 120 }}>Género</th>
                    <th style={{ width: 140 }}>Director</th>
                    <th style={{ width: 140 }}>Productora</th>
                    <th style={{ width: 100 }}>Tipo</th>
                    <th style={{ width: 160 }}>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((m, i) => (
                    <tr key={m._id}>
                      <td className="text-muted small">{i + 1}</td>
                      <td className="small">{m.serial}</td>
                      <td>{m.titulo}</td>
                      <td>{m.anioEstreno}</td>
                      <td>{getNombre(m.genero)}</td>
                      <td>{getNombre(m.director)}</td>
                      <td>{getNombre(m.productora)}</td>
                      <td>{getNombre(m.tipo)}</td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => handleEdit(m)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(m._id)}
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
              {items.map((m, i) => (
                <div key={m._id} className="card mb-2">
                  <div className="card-body py-2">

                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div>
                        <span className="text-muted small me-2">#{i + 1}</span>
                        <span className="fw-medium">{m.titulo}</span>
                      </div>
                      <span className="badge bg-secondary">{m.serial}</span>
                    </div>

                    <div className="small text-muted mb-1">
                      {m.anioEstreno} · {getNombre(m.genero)} · {getNombre(m.tipo)}
                    </div>
                    <div className="small text-muted mb-2">
                      Dir: {getNombre(m.director)} · {getNombre(m.productora)}
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEdit(m)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(m._id)}
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

export default Medias;