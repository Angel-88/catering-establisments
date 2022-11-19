const db = require('../db');

class TypeController {
  async createType (req, res) {
    const { name } = req.body;
    const newType = await db.query(`INSERT INTO types (name)
                                       values ($1) RETURNING *`, [name]);

    res.json(newType.rows[0]);
  }

  async getTypes (req, res) {
    const types = await db.query('SELECT id "id", name "name" FROM public.types');

    res.json(types.rows);
  }
}

module.exports = new TypeController();
