const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

// Content routes
router.get("/", contentController.getAllContents);
router.get("/create", contentController.createContentForm);
router.post("/", contentController.createContent);
router.get("/:id", contentController.getContentById);
router.get("/:id/edit", contentController.updateContentForm);
router.put("/:id", contentController.updateContent);
router.delete("/:id", contentController.deleteContent);

// Season routes
router.get("/:id/seasons/create", contentController.createSeasonForm);
router.post("/:id/seasons", contentController.createSeason);
router.get("/:id/seasons/:seasonId", contentController.getSeasonById);
router.get("/:id/seasons/:seasonId/edit", contentController.updateSeasonForm);
router.put("/:id/seasons/:seasonId", contentController.updateSeason);
router.delete("/:id/seasons/:seasonId", contentController.deleteSeason);

// Episode routes
router.get(
    "/:id/seasons/:seasonId/episodes/:episodeId",
    contentController.getEpisodeById
);
router.get(
    "/:id/seasons/:seasonId/episodes/create",
    contentController.createEpisodeForm
);
router.post("/:id/seasons/:seasonId/episodes", contentController.createEpisode);
router.get(
    "/:id/seasons/:seasonId/episodes/:episodeId/edit",
    contentController.updateEpisodeForm
);
router.put(
    "/:id/seasons/:seasonId/episodes/:episodeId",
    contentController.updateEpisode
);
router.delete(
    "/:id/seasons/:seasonId/episodes/:episodeId",
    contentController.deleteEpisode
);

module.exports = router;
