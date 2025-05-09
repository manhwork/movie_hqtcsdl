const { pool, sql } = require("../config/database");

class Content {
    static async getAll() {
        try {
            const result = await pool.request().query("SELECT * FROM Content");
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
                .query("SELECT * FROM Content WHERE ContentID = @id");
            return result.recordset[0];
        } catch (err) {
            throw err;
        }
    }

    static async create(contentData) {
        try {
            const result = await pool
                .request()
                .input("title", sql.VarChar, contentData.title)
                .input("originalTitle", sql.VarChar, contentData.originalTitle)
                .input(
                    "description",
                    sql.NVarChar(sql.MAX),
                    contentData.description
                )
                .input("type", sql.VarChar, contentData.type)
                .input("releaseDate", sql.Date, contentData.releaseDate)
                .input("rating", sql.Float, contentData.rating)
                .input("posterURL", sql.VarChar, contentData.posterURL)
                .input("backdropURL", sql.VarChar, contentData.backdropURL)
                .input("trailerURL", sql.VarChar, contentData.trailerURL)
                .input("videoURL", sql.VarChar, contentData.videoURL)
                .input("duration", sql.Int, contentData.duration)
                .input("numberOfSeasons", sql.Int, contentData.numberOfSeasons)
                .input("status", sql.VarChar, contentData.status)
                .input("country", sql.VarChar, contentData.country)
                .input("language", sql.VarChar, contentData.language).query(`
                    INSERT INTO Content (
                        Title, OriginalTitle, Description, Type, ReleaseDate,
                        Rating, PosterURL, BackdropURL, TrailerURL, VideoURL,
                        Duration, NumberOfSeasons, Status, Country, Language
                    )
                    VALUES (
                        @title, @originalTitle, @description, @type, @releaseDate,
                        @rating, @posterURL, @backdropURL, @trailerURL, @videoURL,
                        @duration, @numberOfSeasons, @status, @country, @language
                    );
                    SELECT SCOPE_IDENTITY() AS ContentID;
                `);
            return result.recordset[0].ContentID;
        } catch (err) {
            throw err;
        }
    }

    static async update(id, contentData) {
        try {
            await pool
                .request()
                .input("id", sql.Int, id)
                .input("title", sql.VarChar, contentData.title)
                .input("originalTitle", sql.VarChar, contentData.originalTitle)
                .input(
                    "description",
                    sql.NVarChar(sql.MAX),
                    contentData.description
                )
                .input("type", sql.VarChar, contentData.type)
                .input("releaseDate", sql.Date, contentData.releaseDate)
                .input("rating", sql.Float, contentData.rating)
                .input("posterURL", sql.VarChar, contentData.posterURL)
                .input("backdropURL", sql.VarChar, contentData.backdropURL)
                .input("trailerURL", sql.VarChar, contentData.trailerURL)
                .input("videoURL", sql.VarChar, contentData.videoURL)
                .input("duration", sql.Int, contentData.duration)
                .input("numberOfSeasons", sql.Int, contentData.numberOfSeasons)
                .input("status", sql.VarChar, contentData.status)
                .input("country", sql.VarChar, contentData.country)
                .input("language", sql.VarChar, contentData.language).query(`
                    UPDATE Content
                    SET Title = @title,
                        OriginalTitle = @originalTitle,
                        Description = @description,
                        Type = @type,
                        ReleaseDate = @releaseDate,
                        Rating = @rating,
                        PosterURL = @posterURL,
                        BackdropURL = @backdropURL,
                        TrailerURL = @trailerURL,
                        VideoURL = @videoURL,
                        Duration = @duration,
                        NumberOfSeasons = @numberOfSeasons,
                        Status = @status,
                        Country = @country,
                        Language = @language,
                        UpdatedAt = CURRENT_TIMESTAMP
                    WHERE ContentID = @id
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
                .query("DELETE FROM Content WHERE ContentID = @id");
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async getSeasons(contentId) {
        try {
            const result = await pool
                .request()
                .input("contentId", sql.Int, contentId)
                .query(
                    "SELECT * FROM Seasons WHERE ContentID = @contentId ORDER BY SeasonNumber"
                );
            return result.recordset;
        } catch (err) {
            throw err;
        }
    }

    static async getEpisodes(seasonId) {
        try {
            const result = await pool
                .request()
                .input("seasonId", sql.Int, seasonId)
                .query(
                    "SELECT * FROM Episodes WHERE SeasonID = @seasonId ORDER BY EpisodeNumber"
                );
            return result.recordset;
        } catch (err) {
            throw err;
        }
    }

    static async getCount() {
        const result = await pool
            .request()
            .query("SELECT COUNT(*) AS count FROM Content");
        return result.recordset[0].count;
    }

    static async getLatest(limit) {
        const result = await pool
            .request()
            .query(
                `SELECT TOP (${limit}) * FROM Content ORDER BY ReleaseDate DESC`
            );
        return result.recordset;
    }
}

module.exports = Content;
