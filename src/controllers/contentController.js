const Content = require("../models/Content");
const Season = require("../models/Season");
const Episode = require("../models/Episode");

exports.getAllContents = async (req, res) => {
    try {
        const contents = await Content.getAll();
        res.render("contents/index", { contents });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.getContentById = async (req, res) => {
    try {
        const content = await Content.getById(req.params.id);
        if (!content) {
            return res
                .status(404)
                .render("error", { message: "Content not found" });
        }

        let seasons = [];
        if (content.Type === "tvshow") {
            seasons = await Content.getSeasons(req.params.id);
        }

        res.render("contents/show", { content, seasons });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.createContentForm = (req, res) => {
    res.render("contents/create");
};

exports.createContent = async (req, res) => {
    try {
        const contentId = await Content.create(req.body);
        req.flash("success_msg", "Content created successfully");
        res.redirect(`/contents/${contentId}`);
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateContentForm = async (req, res) => {
    try {
        const content = await Content.getById(req.params.id);
        if (!content) {
            return res
                .status(404)
                .render("error", { message: "Content not found" });
        }
        res.render("contents/edit", { content });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateContent = async (req, res) => {
    try {
        await Content.update(req.params.id, req.body);
        req.flash("success_msg", "Content updated successfully");
        res.redirect(`/contents/${req.params.id}`);
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

exports.deleteContent = async (req, res) => {
    try {
        // Lấy tất cả các season thuộc content này
        const seasons = await Season.getByContentId(req.params.id);
        // Xóa toàn bộ episode của từng season
        for (const season of seasons) {
            await Episode.deleteBySeasonId(season.SeasonID);
        }
        // Xóa toàn bộ season
        await Season.deleteByContentId(req.params.id);
        // Xóa content
        await Content.delete(req.params.id);
        req.flash("success_msg", "Content deleted successfully");
        res.redirect("/contents");
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

// Season management
exports.getSeasonById = async (req, res) => {
    try {
        const season = await Season.getById(req.params.seasonId);
        if (!season) {
            return res
                .status(404)
                .render("error", { message: "Season not found" });
        }
        const episodes = await Content.getEpisodes(req.params.seasonId);
        res.render("seasons/show", { season, episodes });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.createSeasonForm = async (req, res) => {
    try {
        const content = await Content.getById(req.params.id);
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
        req.body.contentId = req.params.id;
        const seasonId = await Season.create(req.body);
        req.flash("success_msg", "Season created successfully");
        res.redirect(`/contents/${req.params.id}/seasons/${seasonId}`);
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateSeasonForm = async (req, res) => {
    try {
        const season = await Season.getById(req.params.seasonId);
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
        await Season.update(req.params.seasonId, req.body);
        req.flash("success_msg", "Season updated successfully");
        res.redirect(
            `/contents/${req.params.id}/seasons/${req.params.seasonId}`
        );
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

exports.deleteSeason = async (req, res) => {
    try {
        await Season.delete(req.params.seasonId);
        req.flash("success_msg", "Season deleted successfully");
        res.redirect(`/contents/${req.params.id}`);
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

// Episode management
exports.getEpisodeById = async (req, res) => {
    try {
        const episode = await Episode.getById(req.params.episodeId);
        if (!episode) {
            return res
                .status(404)
                .render("error", { message: "Episode not found" });
        }
        res.render("episodes/show", { episode });
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
        req.flash("success_msg", "Episode created successfully");
        res.redirect(
            `/contents/${req.params.id}/seasons/${req.params.seasonId}/episodes/${episodeId}`
        );
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateEpisodeForm = async (req, res) => {
    try {
        const episode = await Episode.getById(req.params.episodeId);
        if (!episode) {
            return res
                .status(404)
                .render("error", { message: "Episode not found" });
        }
        // Lấy season để lấy ContentID
        const season = await Season.getById(episode.SeasonID);
        res.render("episodes/edit", { episode, season });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateEpisode = async (req, res) => {
    try {
        console.log("req.body", req.body);
        await Episode.update(req.params.episodeId, req.body);
        req.flash("success_msg", "Episode updated successfully");
        const redirectUrl =
            req.headers.referer ||
            `/contents/${req.params.id}/seasons/${req.params.seasonId}`;
        res.redirect(redirectUrl);
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

exports.deleteEpisode = async (req, res) => {
    try {
        await Episode.delete(req.params.episodeId);
        req.flash("success_msg", "Episode deleted successfully");
        res.redirect(
            `/contents/${req.params.id}/seasons/${req.params.seasonId}`
        );
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};
