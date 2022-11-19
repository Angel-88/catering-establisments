const db = require('../db');

class ServiceController {
  async createService (req, res) {
    const { name } = req.body;
    const newService = await db.query(`INSERT INTO services (name)
                                       values ($1) RETURNING *`, [name]);

    res.json(newService.rows[0]);
  }

  async getServices (req, res) {
    const services = await db.query('SELECT id "id", name "name" FROM public.services');

    res.json(services.rows);
  }
}

module.exports = new ServiceController();
