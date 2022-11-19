import {NgModule} from '@angular/core';

import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header.component';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent],
  providers: [],
})
export class HeaderModule {
}
