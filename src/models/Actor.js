const { pool, sql } = require("../config/database");

class Actor {
    static async getAll() {
        try {
            const result = await pool.request().query("SELECT * FROM Actors");
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
                .query("SELECT * FROM Actors WHERE ActorID = @id");
            return result.recordset[0];
        } catch (err) {
            throw err;
        }
    }

    static async create(actorData) {
        try {
            const result = await pool
                .request()
                .input("name", sql.VarChar, actorData.name)
                .input("originalName", sql.VarChar, actorData.originalName)
                .input("bio", sql.NVarChar(sql.MAX), actorData.bio)
                .input("birthDate", sql.Date, actorData.birthDate)
                .input("nationality", sql.VarChar, actorData.nationality)
                .input("photoURL", sql.VarChar, actorData.photoURL).query(`
                    INSERT INTO Actors (Name, OriginalName, Bio, BirthDate, Nationality, PhotoURL)
                    VALUES (@name, @originalName, @bio, @birthDate, @nationality, @photoURL);
                    SELECT SCOPE_IDENTITY() AS ActorID;
                `);
            return result.recordset[0].ActorID;
        } catch (err) {
            throw err;
        }
    }

    static async update(id, actorData) {
        try {
            await pool
                .request()
                .input("id", sql.Int, id)
                .input("name", sql.VarChar, actorData.name)
                .input("originalName", sql.VarChar, actorData.originalName)
                .input("bio", sql.NVarChar(sql.MAX), actorData.bio)
                .input("birthDate", sql.Date, actorData.birthDate)
                .input("nationality", sql.VarChar, actorData.nationality)
                .input("photoURL", sql.VarChar, actorData.photoURL).query(`
                    UPDATE Actors
                    SET Name = @name,
                        OriginalName = @originalName,
                        Bio = @bio,
                        BirthDate = @birthDate,
                        Nationality = @nationality,
                        PhotoURL = @photoURL
                    WHERE ActorID = @id
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
                .query("DELETE FROM Actors WHERE ActorID = @id");
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async getCount() {
        const result = await pool
            .request()
            .query("SELECT COUNT(*) AS count FROM Actors");
        return result.recordset[0].count;
    }

    static async getTop(limit) {
        const result = await pool.request().query(`
            SELECT TOP (${limit}) A.*, COUNT(CA.ContentID) AS MovieCount
            FROM Actors A
            LEFT JOIN ContentActors CA ON A.ActorID = CA.ActorID
            GROUP BY A.ActorID, A.Name, A.Bio, A.PhotoURL
            ORDER BY MovieCount DESC
        `);
        return result.recordset;
    }
}

module.exports = Actor;
