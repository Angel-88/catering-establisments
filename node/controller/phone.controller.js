const db = require('../db');

class PhoneController {
  async createPhone (req, res) {
    const { number } = req.body;
    const newPhone = await db.query(`INSERT INTO phones (number)
                                       values ($1) RETURNING *`, [number]);

    res.json(newPhone.rows[0]);
  }

  async getPhones (req, res) {
    const phones = await db.query('SELECT id "id", number "number" FROM public.phones');

    res.json(phones.rows);
  }
}

module.exports = new PhoneController();
