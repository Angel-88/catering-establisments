import { Injectable } from '@angular/core';
import { TypeDto } from '../../../rest/types/type.dto';
import { CuisineDto } from '../../../rest/cuisines/cuisine.dto';
import { ServiceDto } from '../../../rest/services/service.dto';
import { DishDto } from '../../../rest/dishes/dish.dto';
import { TypesService } from '../../../rest/types/type.service';
import { CuisinesService } from '../../../rest/cuisines/cuisine.service';
import { ServicesService } from '../../../rest/services/service.service';
import { DishesService } from '../../../rest/dishes/dish.service';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class SharedDataService {

  types: TypeDto[] = [];
  cuisines: CuisineDto[] = [];
  services: ServiceDto[] = [];
  dishes: DishDto[] = [];

  constructor(
    private typeService: TypesService,
    private cuisineService: CuisinesService,
    private serviceService: ServicesService,
    private dishService: DishesService,
    ) { }

  getTypesObservable(): Observable<TypeDto[]> {
    if (this.types.length) {
      return of( this.types);
    } else {
      return this.typeService.getTypes().pipe(tap(types => {
          this.types = types;
        }),
      );
    }
  }

  getServicesObservable(): Observable<ServiceDto[]> {
    if (this.services.length) {
      return of( this.services);
    } else {
      return this.serviceService.getServices().pipe(tap(services => {
          this.services = services;
        }),
      );
    }
  }

  getCuisinesObservable(): Observable<CuisineDto[]> {
    if (this.cuisines.length) {
      return of( this.cuisines);
    } else {
      return this.cuisineService.getCuisines().pipe(tap(cuisines => {
          this.cuisines = cuisines;
        }),
      );
    }
  }

  getDishesObservable(): Observable<DishDto[]> {
    if (this.dishes.length) {
      return of( this.dishes);
    } else {
      return this.dishService.getDishes().pipe(tap(dishes => {
          this.dishes = dishes;
        }),
      );
    }
  }
}
