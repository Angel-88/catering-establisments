export class ServiceDto {
  id!: string;
  name!: string;

  constructor(data?: ServiceDto) {
    if (data) Object.assign(this, data);
  }
}
