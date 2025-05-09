const { pool, sql } = require("../config/database");

class Episode {
    static async getAll() {
        try {
            const result = await pool.request().query("SELECT * FROM Episodes");
            return result.recordset;
        } catch (err) {
            throw err;
        }
    }

    static async getById(id) {
        try {
            const result = await pool
                .request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM Episodes WHERE EpisodeID = @id");
            return result.recordset[0];
        } catch (err) {
            throw err;
        }
    }

    static async create(episodeData) {
        try {
            const result = await pool
                .request()
                .input("seasonId", sql.Int, episodeData.seasonId)
                .input("episodeNumber", sql.Int, episodeData.episodeNumber)
                .input("title", sql.VarChar, episodeData.title)
                .input(
                    "description",
                    sql.NVarChar(sql.MAX),
                    episodeData.description
                )
                .input("duration", sql.Int, episodeData.duration)
                .input("videoURL", sql.VarChar, episodeData.videoURL)
                .input("thumbnailURL", sql.VarChar, episodeData.thumbnailURL)
                .input("releaseDate", sql.Date, episodeData.releaseDate).query(`
                    INSERT INTO Episodes (
                        SeasonID, EpisodeNumber, Title, Description,
                        Duration, VideoURL, ThumbnailURL, ReleaseDate
                    )
                    VALUES (
                        @seasonId, @episodeNumber, @title, @description,
                        @duration, @videoURL, @thumbnailURL, @releaseDate
                    );
                    SELECT SCOPE_IDENTITY() AS EpisodeID;
                `);
            return result.recordset[0].EpisodeID;
        } catch (err) {
            throw err;
        }
    }

    static async update(id, episodeData) {
        try {
            // Lấy episode hiện tại để lấy seasonId nếu không có trong episodeData
            const currentEpisode = await this.getById(id);
            if (!currentEpisode) {
                throw new Error("Episode not found");
            }

            // Sử dụng seasonId từ episodeData hoặc từ episode hiện tại
            const seasonId = episodeData.seasonId || currentEpisode.SeasonID;

            await pool
                .request()
                .input("id", sql.Int, id)
                .input("seasonId", sql.Int, seasonId)
                .input("episodeNumber", sql.Int, episodeData.episodeNumber)
                .input("title", sql.VarChar, episodeData.title)
                .input(
                    "description",
                    sql.NVarChar(sql.MAX),
                    episodeData.description
                )
                .input("duration", sql.Int, episodeData.duration)
                .input("videoURL", sql.VarChar, episodeData.videoURL)
                .input("thumbnailURL", sql.VarChar, episodeData.thumbnailURL)
                .input("releaseDate", sql.Date, episodeData.releaseDate).query(`
                    UPDATE Episodes
                    SET SeasonID = @seasonId,
                        EpisodeNumber = @episodeNumber,
                        Title = @title,
                        Description = @description,
                        Duration = @duration,
                        VideoURL = @videoURL,
                        ThumbnailURL = @thumbnailURL,
                        ReleaseDate = @releaseDate
                    WHERE EpisodeID = @id
                `);
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async delete(id) {
        try {
            await pool
                .request()
                .input("id", sql.Int, id)
                .query("DELETE FROM Episodes WHERE EpisodeID = @id");
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async getCount() {
        const result = await pool
            .request()
            .query("SELECT COUNT(*) AS count FROM Episodes");
        return result.recordset[0].count;
    }

    static async deleteBySeasonId(seasonId) {
        try {
            await pool
                .request()
                .input("seasonId", sql.Int, seasonId)
                .query("DELETE FROM Episodes WHERE SeasonID = @seasonId");
            return true;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Episode;
