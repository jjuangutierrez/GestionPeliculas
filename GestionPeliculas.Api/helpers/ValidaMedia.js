const Genero = require("../models/GeneroModule");
const Director = require("../models/DirectorModule");
const Productora = require("../models/ProductoraModule");
const Tipo = require("../models/tipoModule");

const validarGeneroActivo = async (id) => {
  const genero = await Genero.findById(id);

  if (!genero) {
    throw new Error("El género no existe");
  }

  if (genero.estado !== "Activo") {
    throw new Error("El género está inactivo");
  }
};

const validarDirectorActivo = async (id) => {
  const director = await Director.findById(id);

  if (!director) {
    throw new Error("El director no existe");
  }

  if (director.estado !== "Activo") {
    throw new Error("El director está inactivo");
  }
};

const validarProductoraActiva = async (id) => {
  const productora = await Productora.findById(id);

  if (!productora) {
    throw new Error("La productora no existe");
  }

  if (productora.estado !== "Activo") {
    throw new Error("La productora está inactiva");
  }
};

const validarTipoExiste = async (id) => {
  const tipo = await Tipo.findById(id);

  if (!tipo) {
    throw new Error("El tipo no existe");
  }
};

module.exports = {
  validarGeneroActivo,
  validarDirectorActivo,
  validarProductoraActiva,
  validarTipoExiste
};