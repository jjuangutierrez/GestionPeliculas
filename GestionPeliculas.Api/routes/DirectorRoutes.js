const { Router } = require("express");
const { check } = require("express-validator");
const Director = require("../models/DirectorModule");
const validarCampos = require("../middlewares/ValidarCampos");

const router = Router();

router.get("/", async (req, res) => {
  const directores = await Director.find();
  res.json(directores);
});

router.get("/:id", async (req, res) => {
  const director = await Director.findById(req.params.id);
  res.json(director);
});

router.post(
  "/",
  [
    check("nombre").not().isEmpty(),
    check("estado").optional().isIn(["Activo", "Inactivo"]),
    validarCampos
  ],
  async (req, res) => {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json(director);
  }
);

router.put("/:id", async (req, res) => {
  const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(director);
});

router.delete("/:id", async (req, res) => {
  await Director.findByIdAndDelete(req.params.id);
  res.json({ msg: "Director eliminado" });
});

module.exports = router;