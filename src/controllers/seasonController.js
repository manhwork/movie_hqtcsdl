const Season = require("../models/Season");
const Content = require("../models/Content");

exports.getAllSeasons = async (req, res) => {
    try {
        const seasons = await Season.getAll();
        res.render("seasons/index", { seasons });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.getSeasonById = async (req, res) => {
    try {
        const season = await Season.getById(req.params.id);
        if (!season) {
            return res
                .status(404)
                .render("error", { message: "Season not found" });
        }
        const episodes = await Content.getEpisodes(season.SeasonID);
        res.render("seasons/show", { season, episodes });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.createSeasonForm = async (req, res) => {
    try {
        const content = await Content.getById(req.params.contentId);
        if (!content) {
            return res
                .status(404)
                .render("error", { message: "Content not found" });
        }
        res.render("seasons/create", { content });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.createSeason = async (req, res) => {
    try {
        req.body.contentId = req.params.contentId;
        const seasonId = await Season.create(req.body);
        res.redirect(`/contents/${req.params.contentId}/seasons/${seasonId}`);
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateSeasonForm = async (req, res) => {
    try {
        const season = await Season.getById(req.params.id);
        if (!season) {
            return res
                .status(404)
                .render("error", { message: "Season not found" });
        }
        res.render("seasons/edit", { season });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateSeason = async (req, res) => {
    try {
        await Season.update(req.params.id, req.body);
        res.redirect(
            `/contents/${req.params.contentId}/seasons/${req.params.id}`
        );
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.deleteSeason = async (req, res) => {
    try {
        await Season.delete(req.params.id);
        res.redirect(`/contents/${req.params.contentId}`);
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};
