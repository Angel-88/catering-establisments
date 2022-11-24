const db = require('../db');

class EstablishmentController {
  async createEstablishment (req, res) {
    const { name, information, address_geo_title, address_geo, address_iframe } = req.body;
    const newEstablishment = await db.query(`INSERT INTO establishments (name, information, address_geo_title, address_geo, address_iframe)
                                             values ($1, $2, $3, $4,
                                                     $5) RETURNING *`, [name, information, address_geo_title, address_geo, address_iframe]);

    res.json(newEstablishment.rows[0]);
  }

  async getEstablishments (req, res) {
    const query = `
      SELECT *
      FROM public.establishments_v
    `;
    const establishments = await db.query(query);
    const result = establishments.rows.map(res => ({
      id: res.id,
      name: res.name,
        information: res.information,
      address: {
        geo: res.addressGeo,
        geoTitle: res.addressGeoTitle,
        iframe: res.addressIframe,
      },
      types: res.types,
      services: res.services,
      cuisines: res.cuisines,
      dishes: res.dishes,
    }));

    res.json(result);
  }
}

module.exports = new EstablishmentController();
