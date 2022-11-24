export class DishDto {
  id!: string;
  name!: string;

  constructor(data?: DishDto) {
    if (data) Object.assign(this, data);
  }
}
