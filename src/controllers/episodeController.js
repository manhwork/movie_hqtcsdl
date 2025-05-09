const Episode = require("../models/Episode");
const Season = require("../models/Season");

exports.getAllEpisodes = async (req, res) => {
    try {
        const episodes = await Episode.getAll();
        res.render("episodes/index", { episodes });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.getEpisodeById = async (req, res) => {
    try {
        const episode = await Episode.getById(req.params.id);
        if (!episode) {
            return res
                .status(404)
                .render("error", { message: "Episode not found" });
        }
        const season = await Season.getById(episode.SeasonID);
        res.render("episodes/show", { episode, season });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.createEpisodeForm = async (req, res) => {
    try {
        const season = await Season.getById(req.params.seasonId);
        if (!season) {
            return res
                .status(404)
                .render("error", { message: "Season not found" });
        }
        res.render("episodes/create", { season });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.createEpisode = async (req, res) => {
    try {
        req.body.seasonId = req.params.seasonId;
        const episodeId = await Episode.create(req.body);
        res.redirect(
            `/contents/${req.params.contentId}/seasons/${req.params.seasonId}/episodes/${episodeId}`
        );
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateEpisodeForm = async (req, res) => {
    try {
        const episode = await Episode.getById(req.params.id);
        if (!episode) {
            return res
                .status(404)
                .render("error", { message: "Episode not found" });
        }
        res.render("episodes/edit", { episode });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateEpisode = async (req, res) => {
    try {
        await Episode.update(req.params.id, req.body);
        res.redirect(
            `/contents/${req.params.contentId}/seasons/${req.params.seasonId}/episodes/${req.params.id}`
        );
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.deleteEpisode = async (req, res) => {
    try {
        await Episode.delete(req.params.id);
        res.redirect(
            `/contents/${req.params.contentId}/seasons/${req.params.seasonId}`
        );
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};
