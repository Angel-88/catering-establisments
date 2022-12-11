import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { MainComponent } from './main.component';
import { FilterMenuModule } from './filter-menu/filter-menu.module';
import { ListModule } from './list/list.module';
import { HeaderModule } from './header/header.module';
import { MainService } from './main.service';

@NgModule({
  imports: [
    CommonModule,
    FilterMenuModule,
    ListModule,
    HeaderModule,
  ],
  exports: [
    MainComponent,
  ],
  declarations: [ MainComponent ],
  providers: [MainService],
})
export class MainModule {}
