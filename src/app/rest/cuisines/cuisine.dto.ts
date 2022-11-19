export class CuisineDto {
  id!: string;
  name!: string;

  constructor(data?: CuisineDto) {
    if (data) Object.assign(this, data);
  }
}
