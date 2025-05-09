const express = require("express");
const router = express.Router();
const directorController = require("../controllers/directorController");

router.get("/", directorController.getAllDirectors);
router.get("/create", directorController.createDirectorForm);
router.post("/", directorController.createDirector);
router.get("/:id", directorController.getDirectorById);
router.get("/:id/edit", directorController.updateDirectorForm);
router.put("/:id", directorController.updateDirector);
router.delete("/:id", directorController.deleteDirector);

module.exports = router;
