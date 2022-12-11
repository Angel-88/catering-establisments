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
import { SharedDataService } from '../../../core/services/shared-data/shared-data.service';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MainService } from '../main.service';

@Component({
  selector: 'app-filter-menu',
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
  types: Observable<TypeDto[]>;
  cuisines: Observable<CuisineDto[]>;
  services: Observable<ServiceDto[]>;
  dishes: Observable<DishDto[]>;

  checkedTypesIds: Set<string> = new Set();
  checkedDishesIds: Set<string> = new Set();
  checkedCuisinesIds: Set<string> = new Set();
  checkedServicesIds: Set<string> = new Set();

  constructor(
    private readonly sharedDataService: SharedDataService,
    public mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.initSharedDataObservables();
  }

  onTypeCheckboxChanged($event: MatCheckboxChange, id: string) {
    if ($event.checked) {
      this.checkedTypesIds.add(id);
    } else {
      this.checkedTypesIds.delete(id);
    }

    this.mainService.onEstablishmentsParamsChanged({ typeIds: [ ...this.checkedTypesIds ] });
  }

  onDishCheckboxChanged($event: MatCheckboxChange, id: string) {
    if ($event.checked) {
      this.checkedDishesIds.add(id);
    } else {
      this.checkedDishesIds.delete(id);
    }

    this.mainService.onEstablishmentsParamsChanged({ dishIds: [ ...this.checkedDishesIds ] });
  }

  onCuisineCheckboxChanged($event: MatCheckboxChange, id: string) {
    if ($event.checked) {
      this.checkedCuisinesIds.add(id);
    } else {
      this.checkedCuisinesIds.delete(id);
    }

    this.mainService.onEstablishmentsParamsChanged({ cuisineIds: [ ...this.checkedCuisinesIds ] });
  }

  onServicesCheckboxChanged($event: MatCheckboxChange, id: string) {
    if ($event.checked) {
      this.checkedServicesIds.add(id);
    } else {
      this.checkedServicesIds.delete(id);
    }

    this.mainService.onEstablishmentsParamsChanged({ serviceIds: [ ...this.checkedServicesIds ] });
  }

  onOpenNowCheckboxChanged($event: MatCheckboxChange) {
    this.mainService.isOpenNowChecked = $event.checked;
    this.mainService.onEstablishmentsParamsChanged({ openNow: this.mainService.isOpenNowChecked });
  }

  private initSharedDataObservables(): void {
    this.types = this.sharedDataService.getTypesObservable();
    this.services = this.sharedDataService.getServicesObservable();
    this.cuisines = this.sharedDataService.getCuisinesObservable();
    this.dishes = this.sharedDataService.getDishesObservable();
  }
}
