const { pool, sql } = require("../config/database");

class Director {
    static async getAll() {
        try {
            const result = await pool
                .request()
                .query("SELECT * FROM Directors");
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
                .query("SELECT * FROM Directors WHERE DirectorID = @id");
            return result.recordset[0];
        } catch (err) {
            throw err;
        }
    }

    static async create(directorData) {
        try {
            const result = await pool
                .request()
                .input("name", sql.VarChar, directorData.name)
                .input("originalName", sql.VarChar, directorData.originalName)
                .input("bio", sql.NVarChar(sql.MAX), directorData.bio)
                .input("birthDate", sql.Date, directorData.birthDate)
                .input("nationality", sql.VarChar, directorData.nationality)
                .input("photoURL", sql.VarChar, directorData.photoURL).query(`
                    INSERT INTO Directors (Name, OriginalName, Bio, BirthDate, Nationality, PhotoURL)
                    VALUES (@name, @originalName, @bio, @birthDate, @nationality, @photoURL);
                    SELECT SCOPE_IDENTITY() AS DirectorID;
                `);
            return result.recordset[0].DirectorID;
        } catch (err) {
            throw err;
        }
    }

    static async update(id, directorData) {
        try {
            await pool
                .request()
                .input("id", sql.Int, id)
                .input("name", sql.VarChar, directorData.name)
                .input("originalName", sql.VarChar, directorData.originalName)
                .input("bio", sql.NVarChar(sql.MAX), directorData.bio)
                .input("birthDate", sql.Date, directorData.birthDate)
                .input("nationality", sql.VarChar, directorData.nationality)
                .input("photoURL", sql.VarChar, directorData.photoURL).query(`
                    UPDATE Directors
                    SET Name = @name,
                        OriginalName = @originalName,
                        Bio = @bio,
                        BirthDate = @birthDate,
                        Nationality = @nationality,
                        PhotoURL = @photoURL
                    WHERE DirectorID = @id
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
                .query("DELETE FROM Directors WHERE DirectorID = @id");
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async getCount() {
        const result = await pool
            .request()
            .query("SELECT COUNT(*) AS count FROM Directors");
        return result.recordset[0].count;
    }
}

module.exports = Director;
