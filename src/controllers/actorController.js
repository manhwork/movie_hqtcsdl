const Actor = require("../models/Actor");

exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.getAll();
        res.render("actors/index", { actors });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.getActorById = async (req, res) => {
    try {
        const actor = await Actor.getById(req.params.id);
        if (!actor) {
            return res
                .status(404)
                .render("error", { message: "Actor not found" });
        }
        res.render("actors/show", { actor });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.createActorForm = (req, res) => {
    res.render("actors/create");
};

exports.createActor = async (req, res) => {
    try {
        const actorId = await Actor.create(req.body);
        res.redirect(`/actors/${actorId}`);
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateActorForm = async (req, res) => {
    try {
        const actor = await Actor.getById(req.params.id);
        if (!actor) {
            return res
                .status(404)
                .render("error", { message: "Actor not found" });
        }
        res.render("actors/edit", { actor });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateActor = async (req, res) => {
    try {
        await Actor.update(req.params.id, req.body);
        res.redirect(`/actors/${req.params.id}`);
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.deleteActor = async (req, res) => {
    try {
        await Actor.delete(req.params.id);
        res.redirect("/actors");
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};
