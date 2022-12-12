import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FilterMenuComponent } from './filter-menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    PipesModule,
  ],
  exports: [
    FilterMenuComponent,
  ],
  declarations: [ FilterMenuComponent ],
  providers: [],
})
export class FilterMenuModule {}
