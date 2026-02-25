const { Router } = require("express");
const { check } = require("express-validator");
const Productora = require("../models/ProductoraModule");
const validarCampos = require("../middlewares/ValidarCampos");

const router = Router();

router.get("/", async (req, res) => {
  const productoras = await Productora.find();
  res.json(productoras);
});

router.get("/:id", async (req, res) => {
  const productora = await Productora.findById(req.params.id);
  res.json(productora);
});

router.post(
  "/",
  [
    check("nombre").not().isEmpty(),
    check("slogan").not().isEmpty(),
    check("descripcion").not().isEmpty(),
    check("estado").optional().isIn(["Activo", "Inactivo"]),
    validarCampos
  ],
  async (req, res) => {
    const productora = new Productora(req.body);
    await productora.save();
    res.status(201).json(productora);
  }
);

router.put("/:id", async (req, res) => {
  const productora = await Productora.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(productora);
});

router.delete("/:id", async (req, res) => {
  await Productora.findByIdAndDelete(req.params.id);
  res.json({ msg: "Productora eliminada" });
});

module.exports = router;