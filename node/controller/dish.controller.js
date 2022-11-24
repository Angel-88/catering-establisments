const db = require('../db');

class DishController {
  async createDish (req, res) {
    const { name } = req.body;
    const newDish = await db.query(`INSERT INTO dishes (name)
                                       values ($1) RETURNING *`, [name]);

    res.json(newDish.rows[0]);
  }

  async getDishes (req, res) {
    const dishes = await db.query('SELECT id "id", name "name" FROM public.dishes');

    res.json(dishes.rows);
  }
}

module.exports = new DishController();
