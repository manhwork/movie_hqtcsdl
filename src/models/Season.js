const { pool, sql } = require("../config/database");

class Season {
    static async getAll() {
        try {
            const result = await pool.request().query("SELECT * FROM Seasons");
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
                .query("SELECT * FROM Seasons WHERE SeasonID = @id");
            return result.recordset[0];
        } catch (err) {
            throw err;
        }
    }

    static async create(seasonData) {
        try {
            const result = await pool
                .request()
                .input("contentId", sql.Int, seasonData.contentId)
                .input("seasonNumber", sql.Int, seasonData.seasonNumber)
                .input("title", sql.VarChar, seasonData.title)
                .input("posterURL", sql.VarChar, seasonData.posterURL)
                .input("releaseDate", sql.Date, seasonData.releaseDate)
                .input("episodeCount", sql.Int, seasonData.episodeCount).query(`
                    INSERT INTO Seasons (ContentID, SeasonNumber, Title, PosterURL, ReleaseDate, EpisodeCount)
                    VALUES (@contentId, @seasonNumber, @title, @posterURL, @releaseDate, @episodeCount);
                    SELECT SCOPE_IDENTITY() AS SeasonID;
                `);
            return result.recordset[0].SeasonID;
        } catch (err) {
            throw err;
        }
    }

    static async update(id, seasonData) {
        try {
            await pool
                .request()
                .input("id", sql.Int, id)
                .input("contentId", sql.Int, seasonData.contentId)
                .input("seasonNumber", sql.Int, seasonData.seasonNumber)
                .input("title", sql.VarChar, seasonData.title)
                .input("posterURL", sql.VarChar, seasonData.posterURL)
                .input("releaseDate", sql.Date, seasonData.releaseDate)
                .input("episodeCount", sql.Int, seasonData.episodeCount).query(`
                    UPDATE Seasons
                    SET ContentID = @contentId,
                        SeasonNumber = @seasonNumber,
                        Title = @title,
                        PosterURL = @posterURL,
                        ReleaseDate = @releaseDate,
                        EpisodeCount = @episodeCount
                    WHERE SeasonID = @id
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
                .query("DELETE FROM Seasons WHERE SeasonID = @id");
            return true;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Season;
