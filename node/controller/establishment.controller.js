const db = require('../db');

const NAME_BY_DAY_NUMBER = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  7: 'sunday',
};

const DAY_NUMBER_BY_NAME = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

const SocialNetworkEnum = {
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
};

class EstablishmentController {
  async createEstablishment (req, res) {
    const {
      name,
      phones,
      information,
      cuisines,
      types,
      services,
      dishes,
      instagram,
      facebook,
      address,
      schedule
    } = req.body;

    const newEstablishment = await db.query(`INSERT INTO establishments (name, information, address_geo_title, address_geo, address_iframe)
                                             values ($1, $2, $3, $4, $5) RETURNING *`,
      [name, information, address.geoTitle, address.geo, address.iframe]);

    //RETURNING  id, name, information, address_geo_title as addressGeoTitle, address_geo as addressGeo, address_iframe as addressIframe

    if (cuisines.length) {
      for (const cuisine of cuisines) {
        const newEstablishmentsCuisines = await db.query(`INSERT INTO establishments_cuisines (establishment_id, cuisine_id)
                                                          values ('${newEstablishment.rows[0].id}',
                                                                  '${cuisine}') RETURNING *`);
      }
    }

    if (types.length) {
      for (const type of types) {
        const newEstablishmentsTypes = await db.query(`INSERT INTO establishments_types (establishment_id, type_id)
                                                       values ($1, $2) RETURNING *`,
          [newEstablishment.rows[0].id, type]);
      }
    }

    if (services.length) {
      for (const service of services) {
        const newEstablishmentsServices = await db.query(`INSERT INTO establishments_services (establishment_id, service_id)
                                                          values ($1, $2) RETURNING *`,
          [newEstablishment.rows[0].id, service]);
      }
    }

    if (dishes.length) {
      for (const dish of dishes) {
        const newEstablishmentsDishes = await db.query(`INSERT INTO establishments_dishes (establishment_id, dish_id)
                                                        values ('${newEstablishment.rows[0].id}', '${dish}
                                                                ') RETURNING *`);
      }
    }

    if (schedule) {
      for (const [key, value] of Object.entries(schedule)) {
        const newEstablishmentsSchedule = await db.query(`INSERT INTO establishments_days_times (establishment_id, day_n, start_time, end_time)
                                                          values ('${newEstablishment.rows[0].id}',
                                                                  '${DAY_NUMBER_BY_NAME[key]}',
                                                                  '${value.startTime}',
                                                                  '${value.endTime}') RETURNING *`);
      }
    }

    const newEstablishmentsInstagram = await db.query(`INSERT INTO establishments_social_networks (establishment_id, social_network_value, social_network)
                                                       values ('${newEstablishment.rows[0].id}', '${instagram}',
                                                               '${SocialNetworkEnum.INSTAGRAM}') RETURNING *`);

    const newEstablishmentsFacebook = await db.query(`INSERT INTO establishments_social_networks (establishment_id, social_network_value, social_network)
                                                      values ('${newEstablishment.rows[0].id}', '${facebook}',
                                                              '${SocialNetworkEnum.FACEBOOK}') RETURNING *`);

    const newPhonesIds = [];

    if (phones.length) {
      for (let phone of phones) {
        const newPhone = await db.query(`INSERT INTO phones (number)
                                         values ($1) RETURNING * `,
          [phone]);

        newPhonesIds.push(newPhone.rows[0].id);
      }
    }

    if (newPhonesIds.length) {
      for (let phoneId of newPhonesIds) {
        const newEstablishmentsPhones = await db.query(`INSERT INTO establishments_phones (establishment_id, phone_id)
                                                        values ($1, $2) RETURNING * `,
          [newEstablishment.rows[0].id, phoneId]);
      }
    }

    const newEstablishmentRes = await db.query(`SELECT *
                                                FROM public.establishments_v ev
                                                WHERE ev.id = '${newEstablishment.rows[0].id}'`);
    const result = newEstablishmentRes.rows.map(res => ({
      id: res.id,
      name: res.name,
      information: res.information,
      address: {
        geo: res.addressGeo,
        geoTitle: res.addressGeoTitle,
        iframe: res.addressIframe,
      },
      phones: res.phones,
      types: res.types,
      services: res.services,
      cuisines: res.cuisines,
      dishes: res.dishes,
      schedule: EstablishmentController.getSchedule(res.schedule),
      instagram: res.instagram,
      facebook: res.facebook,
    }));

    res.json(result[0]);
  }

  async getEstablishments (req, res) {
    const nameQuery = ' WHERE LOWER("name") LIKE ' + (!!req.query?.name ? `'%${req.query?.name?.toLowerCase()}%'` : `'%'`);
    const typesQuery = req.query?.typeIds?.length ? `AND ev.id IN (
        SELECT et.establishment_id
        FROM establishments_types et
        WHERE et.type_id IN (${req.query?.typeIds}))` : ``;
    const dishesQuery = req.query?.dishIds?.length ? `AND ev.id IN (
        SELECT et.establishment_id
        FROM establishments_dishes et
        WHERE et.dish_id IN (${req.query?.dishIds}))` : ``;
    const cuisinesQuery = req.query?.cuisineIds?.length ? `AND ev.id IN (
        SELECT et.establishment_id
        FROM establishments_cuisines et
        WHERE et.cuisine_id IN (${req.query?.cuisineIds}))` : ``;
    const servicesQuery = req.query?.serviceIds?.length ? `AND ev.id IN (
        SELECT et.establishment_id
        FROM establishments_services et
        WHERE et.service_id IN (${req.query?.serviceIds}))` : ``;
    const openNowQuery = !!req.query?.openNow ? `AND ev.id IN (
        SELECT edt.establishment_id
        FROM PUBLIC.ESTABLISHMENTS_DAYS_TIMES edt
        WHERE extract(isodow from NOW()) = DAY_N
        AND START_TIME < LOCALTIME(0) - interval '1 hour'
        AND END_TIME > LOCALTIME(0) - interval '1 hour')` : ``;

    const query = `
      SELECT *
      FROM public.establishments_v as ev` + nameQuery + typesQuery + dishesQuery + cuisinesQuery + servicesQuery + openNowQuery;

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
      phones: res.phones,
      types: res.types,
      services: res.services,
      cuisines: res.cuisines,
      dishes: res.dishes,
      schedule: EstablishmentController.getSchedule(res.schedule),
      instagram: res.instagram,
      facebook: res.facebook,
    }));

    res.json(result);
  }

  async getEstablishment (req, res) {
    const query = `
      SELECT *
      FROM public.establishments_v
      WHERE id = ${req.params['id']}
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
      phones: res.phones,
      types: res.types,
      services: res.services,
      cuisines: res.cuisines,
      dishes: res.dishes,
      schedule: EstablishmentController.getSchedule(res.schedule),
      instagram: res.instagram,
      facebook: res.facebook,
    }));

    res.json(result[0]);
  }

  static getSchedule (arr) {
    const obj = {};
    if (arr?.length) {
      arr.forEach((schedule) => {
        const number = schedule['dayNumber'];
        obj[NAME_BY_DAY_NUMBER[number]] = { startTime: schedule['startTime'], endTime: schedule['endTime'] };
      });
    }

    return obj;
  }
}

module.exports = new EstablishmentController();
