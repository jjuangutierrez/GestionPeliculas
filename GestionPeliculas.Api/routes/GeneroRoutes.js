const { Router } = require("express");
const { check } = require("express-validator");
const Genero = require("../models/GeneroModule");
const validarCampos = require("../middlewares/ValidarCampos");

const router = Router();

router.get("/", async (req, res) => {
  const generos = await Genero.find();
  res.json(generos);
});

router.get("/:id", async (req, res) => {
  const genero = await Genero.findById(req.params.id);
  res.json(genero);
});

router.post(
  "/",
  [
    check("nombre").not().isEmpty(),
    check("estado").optional().isIn(["Activo", "Inactivo"]),
    validarCampos
  ],
  async (req, res) => {
    const genero = new Genero(req.body);
    await genero.save();
    res.status(201).json(genero);
  }
);

router.put("/:id", async (req, res) => {
  const genero = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(genero);
});

router.delete("/:id", async (req, res) => {
  await Genero.findByIdAndDelete(req.params.id);
  res.json({ msg: "Genero eliminado" });
});

module.exports = router;