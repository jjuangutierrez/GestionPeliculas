const { Router } = require("express");
const { check } = require("express-validator");
const Tipo = require("../models/tipoModule");
const validarCampos = require("../middlewares/ValidarCampos");

const router = Router();

router.get("/", async (req, res) => {
  const tipos = await Tipo.find();
  res.json(tipos);
});

router.get("/:id", async (req, res) => {
  const tipo = await Tipo.findById(req.params.id);
  res.json(tipo);
});

router.post(
  "/",
  [
    check("nombre").not().isEmpty(),
    check("descripcion").not().isEmpty(),
    validarCampos
  ],
  async (req, res) => {
    const tipo = new Tipo(req.body);
    await tipo.save();
    res.status(201).json(tipo);
  }
);

router.put("/:id", async (req, res) => {
  const tipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tipo);
});

router.delete("/:id", async (req, res) => {
  await Tipo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Tipo eliminado" });
});

module.exports = router;