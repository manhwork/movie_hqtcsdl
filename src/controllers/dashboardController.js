const Content = require("../models/Content");
const Season = require("../models/Season");
const Episode = require("../models/Episode");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

// Trang dashboard
exports.dashboardPage = (req, res) => {
    res.render("dashboard");
};

// API trả về dữ liệu thống kê cho dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        // Đếm tổng số
        const contents = await Content.getCount();
        const seasons = await Season.getCount();
        const episodes = await Episode.getCount();
        const actors = await Actor.getCount();
        const directors = await Director.getCount();

        // Lấy top 5 nội dung mới nhất
        const latestContents = await Content.getLatest(5);
        // Lấy top 5 diễn viên nổi bật
        const topActors = await Actor.getTop(5);

        res.json({
            stats: { contents, seasons, episodes, actors, directors },
            latestContents,
            topActors,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
