export class EstablishmentDto {
  id!: string;
  name!: string;
  information!: string;
  addressTitle!: string;
  address!: string;
  establishmentMap!: string;

  constructor(data?: EstablishmentDto) {
    if (data) Object.assign(this, data);
  }
}
