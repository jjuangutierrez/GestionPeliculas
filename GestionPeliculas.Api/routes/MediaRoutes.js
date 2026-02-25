const { Router } = require("express");
const { check } = require("express-validator");
const Media = require("../models/MediaModule");
const validarCampos = require("../middlewares/ValidarCampos");

const router = Router();

const {
    validarGeneroActivo,
    validarDirectorActivo,
    validarProductoraActiva,
    validarTipoExiste
} = require("../helpers/ValidaMedia");


router.get("/", async (req, res) => {
    const medias = await Media.find()
        .populate("genero")
        .populate("director")
        .populate("productora")
        .populate("tipo");

    res.json(medias);
});

router.get("/:id", async (req, res) => {
    const media = await Media.findById(req.params.id)
        .populate("genero director productora tipo");

    res.json(media);
});

router.post(
    "/",
    [
        check("genero").isMongoId(),
        check("genero").custom(validarGeneroActivo),

        check("director").isMongoId(),
        check("director").custom(validarDirectorActivo),

        check("productora").isMongoId(),
        check("productora").custom(validarProductoraActiva),

        check("tipo").isMongoId(),
        check("tipo").custom(validarTipoExiste),

        validarCampos
    ],
    async (req, res) => {
        const media = new Media(req.body);
        await media.save();
        res.status(201).json(media);
    }
);

router.put("/:id", async (req, res) => {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(media);
});

router.delete("/:id", async (req, res) => {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ msg: "Media eliminada" });
});

module.exports = router;