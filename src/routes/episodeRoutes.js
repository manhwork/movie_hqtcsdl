const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episodeController");

// Episode routes
router.get("/", episodeController.getAllEpisodes);
router.get("/create", episodeController.createEpisodeForm);
router.post("/", episodeController.createEpisode);
router.get("/:id", episodeController.getEpisodeById);
router.get("/:id/edit", episodeController.updateEpisodeForm);
router.put("/:id", episodeController.updateEpisode);
router.delete("/:id", episodeController.deleteEpisode);

module.exports = router;
