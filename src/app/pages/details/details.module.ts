import {NgModule} from '@angular/core';

import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  imports: [
    DetailsRoutingModule,
    CommonModule,
    PipesModule,
  ],
  exports: [
  ],
  declarations: [DetailsComponent],
  providers: [],
})
export class DetailsModule {
}
