const express = require("express");
const router = express.Router();
const seasonController = require("../controllers/seasonController");

// Season routes
router.get("/", seasonController.getAllSeasons);
router.get("/create", seasonController.createSeasonForm);
router.post("/", seasonController.createSeason);
router.get("/:id", seasonController.getSeasonById);
router.get("/:id/edit", seasonController.updateSeasonForm);
router.put("/:id", seasonController.updateSeason);
router.delete("/:id", seasonController.deleteSeason);

module.exports = router;
