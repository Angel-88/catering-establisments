import { NgModule } from '@angular/core';
import { SharedDataService } from './shared-data.service';
import { CommonModule } from '@angular/common';
import { TypesService } from '../../../rest/types/type.service';
import { ServicesService } from '../../../rest/services/service.service';
import { CuisinesService } from '../../../rest/cuisines/cuisine.service';
import { DishesService } from '../../../rest/dishes/dish.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    SharedDataService,
    TypesService,
    ServicesService,
    CuisinesService,
    DishesService,
  ],
})
export class SharedDataModule {}
