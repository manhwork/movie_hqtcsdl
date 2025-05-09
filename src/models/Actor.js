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
                .input("bio", sql.Text, actorData.bio)
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
                .input("bio", sql.Text, actorData.bio)
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
}

module.exports = Actor;
