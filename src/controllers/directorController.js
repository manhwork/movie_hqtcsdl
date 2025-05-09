const Director = require("../models/Director");

exports.getAllDirectors = async (req, res) => {
    try {
        const directors = await Director.getAll();
        res.render("directors/index", { directors });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.getDirectorById = async (req, res) => {
    try {
        const director = await Director.getById(req.params.id);
        if (!director) {
            return res
                .status(404)
                .render("error", { message: "Director not found" });
        }
        res.render("directors/show", { director });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.createDirectorForm = (req, res) => {
    res.render("directors/create");
};

exports.createDirector = async (req, res) => {
    try {
        const directorId = await Director.create(req.body);
        req.flash("success_msg", "Thêm đạo diễn thành công!");
        res.redirect(`/directors/${directorId}`);
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateDirectorForm = async (req, res) => {
    try {
        const director = await Director.getById(req.params.id);
        if (!director) {
            return res
                .status(404)
                .render("error", { message: "Director not found" });
        }
        res.render("directors/edit", { director });
    } catch (err) {
        res.status(500).render("error", { message: err.message });
    }
};

exports.updateDirector = async (req, res) => {
    try {
        await Director.update(req.params.id, req.body);
        req.flash("success_msg", "Cập nhật đạo diễn thành công!");
        res.redirect(`/directors/${req.params.id}`);
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};

exports.deleteDirector = async (req, res) => {
    try {
        await Director.delete(req.params.id);
        req.flash("success_msg", "Xóa đạo diễn thành công!");
        res.redirect("/directors");
    } catch (err) {
        req.flash("error_msg", err.message);
        res.status(500).render("error", { message: err.message });
    }
};
