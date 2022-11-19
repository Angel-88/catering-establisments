import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FilterMenuComponent } from './filter-menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TypesService } from '../../../rest/types/type.service';
import { ServicesService } from 'src/app/rest/services/service.service';
import { CuisinesService } from 'src/app/rest/cuisines/cuisine.service';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
  ],
  exports: [
    FilterMenuComponent,
  ],
  declarations: [ FilterMenuComponent ],
  providers: [
    TypesService,
    ServicesService,
    CuisinesService,
  ],
})
export class FilterMenuModule {}
