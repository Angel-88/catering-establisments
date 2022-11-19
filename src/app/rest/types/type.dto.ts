export class TypeDto {
  id!: string;
  name!: string;

  constructor(data?: TypeDto) {
    if (data) Object.assign(this, data);
  }
}
