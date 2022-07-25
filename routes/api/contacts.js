const express = require("express");
const { basedir } = global;
const router = express.Router();
const ctrl = require(`${basedir}/controllers/contacts`);
const ctrlWrapper = require(`${basedir}/utils/ctrlWrapper`);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.put("/:id", ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", ctrlWrapper(ctrl.updateStatusContact));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
