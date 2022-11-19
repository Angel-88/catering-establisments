import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import { MainComponent } from './main.component';
import { FilterMenuModule } from './filter-menu/filter-menu.module';
import { ListModule } from './list/list.module';
import { HeaderModule } from './header/header.module';
import { FormAddEstablishmentModule }
  from '../../shared/components/form-add-establishment/form-add-establishment.module';

@NgModule({
  imports: [
    CommonModule,
    FilterMenuModule,
    ListModule,
    HeaderModule,
    FormAddEstablishmentModule,
  ],
  exports: [
    MainComponent
  ],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule {
}
