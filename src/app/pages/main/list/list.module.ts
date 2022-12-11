import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import { ListComponent } from './list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    RouterModule,
    MatTooltipModule,
  ],
  exports: [
    ListComponent,
  ],
  declarations: [ListComponent],
  providers: [],
})
export class ListModule {
}
