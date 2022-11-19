import { Component, OnInit } from '@angular/core';
import { TypesService } from '../../../rest/types/type.service';
import { TypeDto } from '../../../rest/types/type.dto';
import { HttpClient } from '@angular/common/http';
import { CuisinesService } from '../../../rest/cuisines/cuisine.service';
import { CuisineDto } from '../../../rest/cuisines/cuisine.dto';
import { ServiceDto } from '../../../rest/services/service.dto';
import { ServicesService } from '../../../rest/services/service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter-menu.component.html',
  styleUrls: [ './filter-menu.component.css' ],
  providers: [
   TypesService,
  ],
})

export class FilterMenuComponent implements OnInit {

  types: TypeDto[] = [];
  cuisines: CuisineDto[] = [];
  services: ServiceDto[] = [];

  constructor(
    private typeService: TypesService,
    private cuisineService: CuisinesService,
    private serviceService: ServicesService,
    public http: HttpClient,
  ) {}

  // filters = [
  //   {
  //     filter: 'Зараз відкрито',
  //   }, {
  //     filter: 'Акції',
  //   }, {
  //     filter: 'Бронювання',
  //   },
  // ];

  ngOnInit(): void {
    this.initTypes();
    this.initCuisines();
    this.initServices();
  }

  private initTypes(): void {
    this.typeService.getTypes().subscribe(types => {
      this.types = types;
      }
    );
  }

  private initCuisines(): void {
    this.cuisineService.getCuisines().subscribe(cuisines => {
        this.cuisines = cuisines;
      }
    );
  }

  private initServices(): void {
    this.serviceService.getServices().subscribe(services => {
        this.services = services;
      }
    );
  }
}
