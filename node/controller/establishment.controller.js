const db = require('../db');

class EstablishmentController {
  async createEstablishment (req, res) {
    const { name, information, address_title, address, establishment_map } = req.body;
    const newEstablishment = await db.query(`INSERT INTO establishments (name, information, address_title, address, establishment_map)
                                             values ($1, $2, $3, $4,
                                                     $5) RETURNING *`, [name, information, address_title, address, establishment_map]);

    res.json(newEstablishment.rows[0]);
  }

  async getEstablishments (req, res) {
    const query = `
      SELECT establishments.id                "id",
             establishments.name              "name",
             establishments.information       "information",
             establishments.address_title     "addressTitle",
             establishments.address           "address",
             establishments.establishment_map "establishment_map",
             types.name                       "type"
      FROM public.establishments establishments
             LEFT JOIN public.establishments_types establishmentsTypes
                       ON establishmentsTypes.establishment_id = establishments.id
             LEFT JOIN public.types types ON establishmentsTypes.type_id = types.id
    `;
    const establishments = await db.query(query);

    res.json(establishments.rows);
  }
}

module.exports = new EstablishmentController();
