import { Component, OnInit } from '@angular/core';
import { TypesService } from '../../../rest/types/type.service';
import { TypeDto } from '../../../rest/types/type.dto';
import { HttpClient } from '@angular/common/http';
import { CuisinesService } from '../../../rest/cuisines/cuisine.service';
import { CuisineDto } from '../../../rest/cuisines/cuisine.dto';
import { ServiceDto } from '../../../rest/services/service.dto';
import { ServicesService } from '../../../rest/services/service.service';
import { DishDto } from '../../../rest/dishes/dish.dto';
import { DishesService } from '../../../rest/dishes/dish.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter-menu.component.html',
  styleUrls: [ './filter-menu.component.css' ],
  providers: [
    TypesService,
    ServicesService,
    CuisinesService,
    DishesService,
  ],
})

export class FilterMenuComponent implements OnInit {

  types: TypeDto[] = [];
  cuisines: CuisineDto[] = [];
  services: ServiceDto[] = [];
  dishes: DishDto[] = [];

  constructor(
    private typeService: TypesService,
    private cuisineService: CuisinesService,
    private serviceService: ServicesService,
    private dishService: DishesService,
    public http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.initTypes();
    this.initCuisines();
    this.initServices();
    this.initDishes();
  }

  private initTypes(): void {
    this.typeService.getTypes().subscribe(types => {
        this.types = types;
      },
    );
  }

  private initCuisines(): void {
    this.cuisineService.getCuisines().subscribe(cuisines => {
        this.cuisines = cuisines;
      },
    );
  }

  private initServices(): void {
    this.serviceService.getServices().subscribe(services => {
        this.services = services;
      },
    );
  }

  private initDishes(): void {
    this.dishService.getDishes().subscribe(dishes => {
        this.dishes = dishes;
      },
    );
  }
}
