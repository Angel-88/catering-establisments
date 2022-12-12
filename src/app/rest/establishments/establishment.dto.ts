export class EstablishmentDto {
  id?: string;
  name: string;
  information: string;
  address!: Address;
  schedule: ScheduleDto;
  instagram: string;
  facebook: string;
  image?: string;
  types: string[];
  cuisines: string[];
  services: string[];
  dishes: string[];
  phones: string[];
  listImageName?: string;
  detailsMainImageName?: string;
  detailsImagesNames?: string[];

  listImage?: any;
  detailsMainImage?: any;
  detailsImages?;

  constructor(data?: EstablishmentDto) {
    if (data) Object.assign(this, data);
  }
}

export interface Address {
  geo: string;
  geoTitle: string;
  iframe: string;
}

export interface ScheduleDto {
  monday: DayDto;
  tuesday: DayDto;
  wednesday: DayDto;
  thursday: DayDto;
  friday: DayDto;
  saturday: DayDto;
  sunday: DayDto;
}

export interface DayDto {
  startTime: string;
  endTime: string;
}

export enum DayEnum {
  'MONDAY' = 'monday',
  'TUESDAY' = 'tuesday',
  'WEDNESDAY' = 'wednesday',
  'THURSDAY' = 'thursday',
  'FRIDAY' = 'friday',
  'SATURDAY' = 'saturday',
  'SUNDAY' = 'sunday',
}
