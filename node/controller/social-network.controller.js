const db = require('../db');

class SocialNetworkController {
  async createSocialNetwork (req, res) {
    const { name } = req.body;
    const newSocialNetwork = await db.query(`INSERT INTO social_networks (name)
                                       values ($1) RETURNING *`, [name]);

    res.json(newSocialNetwork.rows[0]);
  }

  async getSocialNetworks (req, res) {
    const types = await db.query('SELECT id "typeId", name "typeName" FROM public.types');

    res.json(types.rows);
  }
}

module.exports = new SocialNetworkController();
