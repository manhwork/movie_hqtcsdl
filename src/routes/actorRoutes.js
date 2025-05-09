const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actorController");

router.get("/", actorController.getAllActors);
router.get("/create", actorController.createActorForm);
router.post("/", actorController.createActor);
router.get("/:id", actorController.getActorById);
router.get("/:id/edit", actorController.updateActorForm);
router.put("/:id", actorController.updateActor);
router.delete("/:id", actorController.deleteActor);

module.exports = router;
