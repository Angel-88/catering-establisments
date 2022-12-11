import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FilterMenuComponent } from './filter-menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  exports: [
    FilterMenuComponent,
  ],
  declarations: [ FilterMenuComponent ],
  providers: [],
})
export class FilterMenuModule {}
