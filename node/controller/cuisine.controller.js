const db = require('../db');

class CuisineController {
  async createCuisine (req, res) {
    const { name } = req.body;
    const newCuisine = await db.query(`INSERT INTO cuisines (name)
                                       values ($1) RETURNING *`, [name]);

    res.json(newCuisine.rows[0]);
  }

  async getCuisines (req, res) {
    const cuisines = await db.query('SELECT id "id", name "name" FROM public.cuisines');

    res.json(cuisines.rows);
  }
}

module.exports = new CuisineController();
